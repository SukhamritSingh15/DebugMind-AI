package com.debugmind.backend.service;

import com.debugmind.backend.exception.GitHubRepositoryException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import org.springframework.beans.factory.annotation.Value;
import java.util.Comparator;
@Service
public class GitHubService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final GitHubFileFilter gitHubFileFilter;

    private static final Pattern GITHUB_URL_PATTERN =
            Pattern.compile(
                    "^https://github\\.com/([^/]+)/([^/]+)/?$"
            );

    public GitHubService(
            GitHubFileFilter gitHubFileFilter,
            @Value("${github.token}") String githubToken
    ) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader(
                        "Accept",
                        "application/vnd.github+json"
                )
                .defaultHeader(
                        "User-Agent",
                        "DebugMind-AI"
                )
                .defaultHeader(
                        "Authorization",
                        "Bearer " + githubToken
                )
                .build();

        this.objectMapper = new ObjectMapper();
        this.gitHubFileFilter = gitHubFileFilter;
    }
    public String validateRepository(String repositoryUrl) {

        Matcher matcher =
                GITHUB_URL_PATTERN.matcher(repositoryUrl.trim());

        if (!matcher.matches()) {
            throw new GitHubRepositoryException(
                    "Invalid GitHub repository URL"
            );
        }

        String owner = matcher.group(1);
        String repository = matcher.group(2);

        try {

            restClient.get()
                    .uri(
                            "/repos/{owner}/{repository}",
                            owner,
                            repository
                    )
                    .retrieve()
                    .toBodilessEntity();

            return "GitHub repository is valid and accessible";

        } catch (RestClientException exception) {

            System.out.println(
                    "GitHub API error: "
                            + exception.getMessage()
            );

            throw new GitHubRepositoryException(
                    "GitHub repository not found or inaccessible"
            );
        }
    }
    public String getRepositoryTree(String repositoryUrl) {

        Matcher matcher =
                GITHUB_URL_PATTERN.matcher(repositoryUrl.trim());

        if (!matcher.matches()) {
            throw new GitHubRepositoryException(
                    "Invalid GitHub repository URL"
            );
        }

        String owner = matcher.group(1);
        String repository = matcher.group(2);

        try {

            String defaultBranch = getDefaultBranch(repositoryUrl);

            return restClient.get()
                    .uri(
                            "/repos/{owner}/{repository}/git/trees/{branch}?recursive=1",
                            owner,
                            repository,
                            defaultBranch
                    )
                    .retrieve()
                    .body(String.class);

        } catch (RestClientException exception) {

            System.out.println(
                    "GitHub tree API error: "
                            + exception.getMessage()
            );

            throw new GitHubRepositoryException(
                    "Unable to fetch repository file tree"
            );
        }
    }
    public List<String> getFilteredFiles(String repositoryUrl) {

        String treeJson = getRepositoryTree(repositoryUrl);

        try {
            JsonNode root = objectMapper.readTree(treeJson);

            List<String> filteredFiles = new ArrayList<>();

            JsonNode tree = root.get("tree");

            if (tree == null || !tree.isArray()) {
                return filteredFiles;
            }

            for (JsonNode item : tree) {

                String type = item.path("type").asText();
                String path = item.path("path").asText();

                if (!"blob".equals(type)) {
                    continue;
                }

                if (gitHubFileFilter.shouldInclude(path)) {
                    filteredFiles.add(path);
                }
            }

            return filteredFiles;

        } catch (Exception exception) {
            throw new GitHubRepositoryException(
                    "Unable to process repository file tree"
            );
        }
    }
    public String getFileContent(String repositoryUrl, String filePath) {

        Matcher matcher =
                GITHUB_URL_PATTERN.matcher(repositoryUrl.trim());

        if (!matcher.matches()) {
            throw new GitHubRepositoryException(
                    "Invalid GitHub repository URL"
            );
        }

        String owner = matcher.group(1);
        String repository = matcher.group(2);

        String response;

        try {

            response = restClient.get()
                    .uri(
                            "/repos/{owner}/{repository}/contents/{path}",
                            owner,
                            repository,
                            filePath
                    )
                    .retrieve()
                    .body(String.class);

        } catch (RestClientException exception) {

            System.out.println(
                    "GitHub file fetch error for: " + filePath
            );

            System.out.println(
                    "GitHub API error: " + exception.getMessage()
            );

            throw new GitHubRepositoryException(
                    "Unable to fetch file content"
            );
        }

        try {

            JsonNode root =
                    objectMapper.readTree(response);

            String encodedContent =
                    root.path("content").asText();

            if (encodedContent.isBlank()) {
                throw new GitHubRepositoryException(
                        "File content is unavailable"
                );
            }

            String cleanedContent =
                    encodedContent.replaceAll("\\s", "");

            byte[] decodedBytes =
                    Base64.getDecoder().decode(cleanedContent);

            return new String(
                    decodedBytes,
                    StandardCharsets.UTF_8
            );

        } catch (GitHubRepositoryException exception) {

            throw exception;

        } catch (Exception exception) {

            throw new GitHubRepositoryException(
                    "Unable to decode file content"
            );
        }
    }
    public String buildRepositoryContext(String repositoryUrl) {

        List<String> files = getFilteredFiles(repositoryUrl);

        files.sort(
                Comparator
                        .comparingInt(
                                gitHubFileFilter::getPriority
                        )
                        .thenComparing(String::compareTo)
        );

        final int MAX_FILES = 20;
        final int MAX_FILE_SIZE = 50_000;
        final int MAX_TOTAL_SIZE = 300_000;

        List<String> selectedFiles = new ArrayList<>();
        Map<String, String> fileContents = new LinkedHashMap<>();

        int totalSize = 0;

        for (String filePath : files) {

            if (selectedFiles.size() >= MAX_FILES) {
                break;
            }

            String content = getFileContent(
                    repositoryUrl,
                    filePath
            );

            if (content == null || content.isBlank()) {
                continue;
            }

            if (content.length() > MAX_FILE_SIZE) {
                continue;
            }

            if (totalSize + content.length() > MAX_TOTAL_SIZE) {
                break;
            }

            selectedFiles.add(filePath);
            fileContents.put(filePath, content);

            totalSize += content.length();
        }

        StringBuilder context = new StringBuilder();

        context.append("""
            REPOSITORY ANALYSIS CONTEXT

            The following files were selected from the repository for analysis.

            IMPORTANT:
            The absence of a file from this context does NOT prove that the file
            does not exist in the repository.

            Only make claims about missing functionality when the available
            repository context provides sufficient evidence.

            Files included:
            """);

        for (String filePath : selectedFiles) {
            context.append("\n- ");
            context.append(filePath);
        }

        context.append("\n\n");

        for (Map.Entry<String, String> entry : fileContents.entrySet()) {

            context.append("\n\n===== FILE: ");
            context.append(entry.getKey());
            context.append(" =====\n\n");

            context.append(entry.getValue());
        }

        return context.toString();
    }
    private String getDefaultBranch(String repositoryUrl) {
        Matcher matcher =
                GITHUB_URL_PATTERN.matcher(repositoryUrl.trim());

        if (!matcher.matches()) {
            throw new GitHubRepositoryException(
                    "Invalid GitHub repository URL"
            );
        }

        String owner = matcher.group(1);
        String repository = matcher.group(2);

        try {
            String response = restClient.get()
                    .uri(
                            "/repos/{owner}/{repository}",
                            owner,
                            repository
                    )
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);

            String defaultBranch =
                    root.path("default_branch").asText();

            if (defaultBranch == null || defaultBranch.isBlank()) {
                throw new GitHubRepositoryException(
                        "Unable to determine repository default branch"
                );
            }

            return defaultBranch;

        } catch (GitHubRepositoryException exception) {
            throw exception;

        } catch (Exception exception) {
            throw new GitHubRepositoryException(
                    "Unable to determine repository default branch"
            );
        }
    }
}