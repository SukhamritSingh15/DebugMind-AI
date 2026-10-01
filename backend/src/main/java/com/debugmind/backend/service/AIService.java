package com.debugmind.backend.service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import com.debugmind.backend.exception.AIServiceException;

import java.util.List;
import java.util.Map;

@Service
public class AIService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.model}")
    private String model;

    public AIService(
            ObjectMapper objectMapper,
            @Value("${gemini.api-key}") String apiKey
    ) {
        this.objectMapper = objectMapper;

        this.restClient = RestClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .defaultHeader(
                        "x-goog-api-key",
                        apiKey
                )
                .defaultHeader(
                        HttpHeaders.CONTENT_TYPE,
                        MediaType.APPLICATION_JSON_VALUE
                )
                .build();
    }
    public String analyzeCode(
            String errorMessage,
            String code,
            String language
    ) {
        String errorContext = errorMessage == null || errorMessage.isBlank()
                ? "No error message was provided. Analyze the code for potential bugs, errors, and issues."
                : errorMessage;

        String prompt = """
        You are DebugMind AI, an expert programming debugger.

        Analyze the following programming problem carefully.

        Programming language:
        %s

        Error message:
        %s

        Code:
        %s

        Return the analysis using exactly this structure:

        1. Error Explanation
        Explain what the error means in simple but technically accurate terms.

        2. Root Cause
        Identify the exact line, variable, condition, or logic responsible for the problem.

        3. Exact Fix
        Explain precisely what needs to be changed and why.

        4. Corrected Code
        Provide ONE complete corrected version of the user's code.
        Do not provide multiple solutions, alternatives, or options.
        Do not label solutions as Option A, Option B, etc.
        Put the corrected code inside exactly ONE Markdown code block.

        5. Best Practices
        Give a short list of relevant practices that would help prevent this type of bug.

        Important rules:
        - Follow the structure above exactly.
        - Provide only ONE recommended solution.
        - Do not provide alternative implementations unless absolutely necessary.
        - Do not repeat the same code in multiple sections.
        - Keep the explanation focused on the actual problem.
        - The corrected code must be complete and directly usable.
        - Preserve the user's intended functionality whenever possible.
        """.formatted(
                language,
                errorContext,
                code == null ? "No code provided." : code
        );
        try {


            Map<String, Object> requestBody = Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt
                                            )
                                    )
                            )
                    )
            );

            String response = restClient.post()
                    .uri("/v1beta/models/" + model + ":generateContent")
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);

            return extractOutputText(root);

        }  catch (Exception e) {

        throw new AIServiceException(
                "AI service temporarily unavailable",
                e
        );
    }
    }

    private String extractOutputText(JsonNode root) {

        JsonNode candidates = root.path("candidates");

        if (!candidates.isArray() || candidates.isEmpty()) {
            return "No AI response was generated.";
        }

        JsonNode parts =
                candidates.get(0)
                        .path("content")
                        .path("parts");

        StringBuilder result = new StringBuilder();

        for (JsonNode part : parts) {

            JsonNode text = part.path("text");

            if (!text.isMissingNode()) {
                result.append(text.asText());
            }
        }

        return result.toString();
    }
    public String analyzeRepository(
            String repositoryUrl,
            String repositoryContext
    ) {

        String prompt = """
            You are DebugMind AI, an expert software engineer performing a repository-level code review.

            Your job is to analyze the provided repository evidence accurately.

            IMPORTANT:
            The repository files provided below are the source of truth for this analysis.
            Do not rely on assumptions about framework versions, dependencies, project structure,
            or coding conventions.

            Repository:
            %s

            Repository source code:
            %s


            ================================
            CRITICAL ANALYSIS RULES
            ================================

            1. ONLY report a bug, security issue, or technical problem when it is supported
               by the provided repository files.

            2. DO NOT assume that a dependency, framework version, library, package,
               configuration, class, endpoint, or feature is missing or invalid.

            3. ALWAYS inspect pom.xml, package configuration, build files, and application
               configuration before making claims about:
               - dependencies
               - framework versions
               - libraries
               - plugins
               - build configuration
               - application configuration

            4. Respect the ACTUAL framework version used by the project.
               Do not replace APIs or packages merely because they are different from
               APIs used by older framework versions.

            5. Do NOT recommend changing a valid framework-specific API simply because
               another version of the framework uses a different API.

            6. Distinguish every finding as one of:
               - Confirmed Issue
               - Potential Risk
               - Improvement Suggestion

            7. A style preference, optional annotation, alternative implementation,
               or personal coding preference MUST NOT be classified as a bug.

            8. Do NOT classify something as CRITICAL unless there is strong evidence that
               it can prevent the application from:
               - building
               - starting
               - authenticating users
               - protecting user data
               - performing a core application function

            9. Do NOT claim that Maven dependencies are invalid unless the provided
               pom.xml gives clear evidence supporting that claim.

            10. Do NOT claim that an import is invalid unless the provided dependency
                configuration demonstrates that the imported package is unavailable.

            11. Before reporting a finding, identify the exact evidence in the provided
                source files that supports the finding.

            12. If the available repository context is insufficient to verify a claim,
                say exactly:

                "Unable to verify from the provided repository context."

            13. NEVER invent:
                - files
                - dependencies
                - classes
                - methods
                - endpoints
                - configurations
                - database tables
                - application behavior

            14. The absence of a file from the provided context does NOT prove that the
                file does not exist in the repository.

            15. Do not claim that functionality is missing unless the provided repository
                context contains enough evidence to make that conclusion.


            ================================
            SEVERITY RULES
            ================================

            CRITICAL:
            Confirmed issue that prevents the application from building, starting,
            authenticating users, protecting data, or performing a core function.

            HIGH:
            Confirmed security vulnerability, serious data-loss risk, or serious
            production failure.

            MEDIUM:
            Confirmed correctness, reliability, or significant performance issue.

            LOW:
            Minor maintainability or code-quality issue.

            IMPROVEMENT:
            Optional architectural, maintainability, readability, or modernization
            suggestion that is NOT a bug.

            ================================
            CONFIRMED ISSUE REQUIREMENT
            ================================

            A finding may only be classified as "Confirmed Issue" when the
            provided repository evidence is sufficient to demonstrate that
            the issue actually exists.

            If the evidence only suggests that something MIGHT be wrong,
            classify it as "Potential Risk".

            If it is merely an optional improvement, classify it as
            "Improvement Suggestion".

            Do not classify an issue as "Confirmed Issue" based only on:
            - general programming knowledge
            - assumptions about framework versions
            - assumptions about dependencies
            - assumptions about external APIs
            - unfamiliar package names
            - differences from older framework versions

            Before calling something a confirmed issue, identify concrete
            evidence in the provided repository context.


            ================================
            FRAMEWORK VERSION AWARENESS
            ================================

            Before reporting an invalid import, dependency, starter, package,
            API, or configuration, inspect the actual framework version in the
            provided build configuration.

            Framework APIs can change between major versions.

            Do not assume that an API or package is invalid because it differs
            from APIs used in older framework versions.

            If the project uses Spring Boot 4.x, recognize that Jackson 3 is
            the preferred/default JSON library.

            The package:
            tools.jackson.databind.*

            is valid in Spring Boot 4.x and MUST NOT be reported as an invalid
            Jackson package solely because Jackson 2 uses:
            com.fasterxml.jackson.databind.*


            ================================
            EXTERNAL API VALIDATION
            ================================

            Do not classify an external API model, endpoint, dependency,
            service, or configuration as invalid solely from general knowledge.

            Do not claim that a Gemini model identifier is invalid unless the
            repository contains direct evidence such as:
            - an actual API error response
            - an integration test failure
            - explicit documentation included in the repository

            If the repository context does not contain sufficient evidence,
            classify the finding as:

            "Unable to verify from the provided repository context."


            ================================
            WORKING CONFIGURATION
            ================================

            If the provided repository configuration is demonstrably being used
            by the application and the application is functioning with that
            configuration, do not classify the configuration as a confirmed bug
            without concrete contradictory evidence.

            Never recommend replacing a current framework API with an older
            framework API simply because the older API is more familiar.

            Always prioritize the actual framework version and dependency
            configuration present in the repository.

            ================================
            ANALYSIS STRUCTURE
            ================================

            Return the analysis using exactly this structure:


            1. Project Overview

            Briefly explain what the project appears to do based only on the provided
            repository source code.


            2. Architecture & Structure

            Explain the main components, layers, technologies, and how they appear
            to interact.

            Mention actual file paths when useful.


            3. Bugs & Potential Issues

            Identify concrete bugs, suspicious logic, error-prone code, or runtime
            problems supported by the provided source code.

            For every finding include:

            - Classification: Confirmed Issue / Potential Risk
            - Severity
            - File
            - Evidence
            - Explanation
            - Recommended action

            Do not report speculative bugs as confirmed bugs.


            4. Security Concerns

            Identify security risks supported by the provided source code.

            Pay particular attention to:

            - authentication
            - authorization
            - JWT handling
            - password handling
            - secrets
            - API keys
            - CORS
            - exposed endpoints
            - input validation
            - data ownership
            - SQL/database access
            - external API access

            Do not claim a vulnerability exists unless the provided code supports it.

            Clearly distinguish confirmed vulnerabilities from potential risks.


            5. Code Quality

            Identify maintainability, readability, duplication, coupling,
            error-handling, or design issues supported by the source code.

            Do not classify subjective style preferences as bugs.


            6. Performance Concerns

            Identify concrete performance concerns supported by the code.

            Consider:

            - unnecessary API calls
            - database queries
            - large data processing
            - loops
            - memory usage
            - external API calls
            - unbounded results
            - repeated computation

            Only report concerns supported by the provided code.


            7. Recommended Improvements

            Provide practical improvements based on the findings above.

            Clearly label optional improvements as:

            Improvement Suggestion

            Do not present optional improvements as confirmed bugs.


            8. Priority Findings

            List the most important verified findings.

            For each finding provide:

            - Severity
            - Classification
            - File
            - Problem
            - Evidence
            - Recommended action

            Do not invent severity for unsupported claims.


            ================================
            FINAL ACCURACY RULES
            ================================

            - Accuracy is more important than finding a large number of issues.
            - It is acceptable to report "No confirmed issue found."
            - It is acceptable to report "Unable to verify from the provided repository context."
            - Do not manufacture problems to make the report look more comprehensive.
            - Do not recommend framework downgrades or upgrades unless the provided
              repository evidence demonstrates that the current version is problematic.
            - Do not replace imports unless the provided project configuration proves
              that the import is invalid.
            - Do not contradict the project's actual build configuration.
            - Do not report optional improvements as bugs.
            - Do not repeat the same finding in multiple categories.
            """.formatted(
                repositoryUrl,
                repositoryContext
        );

        try {


            Map<String, Object> requestBody = Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt
                                            )
                                    )
                            )
                    )
            );

            final int MAX_ATTEMPTS = 3;

            for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {

                try {

                    String response = restClient.post()
                            .uri("/v1beta/models/" + model + ":generateContent")
                            .body(requestBody)
                            .retrieve()
                            .body(String.class);

                    JsonNode root = objectMapper.readTree(response);

                    return extractOutputText(root);

                } catch (RestClientResponseException e) {

                    int statusCode = e.getStatusCode().value();

                    if (statusCode == 429) {
                        System.out.println("Gemini API quota exceeded.");

                        throw new AIServiceException(
                                "Gemini API quota exceeded. Please try again later."
                        );
                    }

                    boolean retryable =
                            statusCode == 500 ||
                                    statusCode == 502 ||
                                    statusCode == 503 ||
                                    statusCode == 504;

                    if (!retryable || attempt == MAX_ATTEMPTS) {

                        System.out.println(
                                "Gemini repository analysis failed with HTTP "
                                        + statusCode
                        );

                        throw e;
                    }

                    long delay = attempt * 2000L;

                    System.out.println(
                            "Gemini temporarily unavailable (HTTP "
                                    + statusCode
                                    + "). Retrying in "
                                    + (delay / 1000)
                                    + " seconds..."
                    );

                    try {
                        Thread.sleep(delay);
                    } catch (InterruptedException interruptedException) {

                        Thread.currentThread().interrupt();

                        throw new AIServiceException(
                                "AI service retry was interrupted",
                                interruptedException
                        );
                    }
                }
            }

            throw new AIServiceException(
                    "AI service temporarily unavailable"
            );
        } catch (AIServiceException e) {
            throw e;

        } catch (Exception e) {

            System.out.println(
                    "Gemini repository analysis error: "
                            + e.getMessage()
            );

            e.printStackTrace();

            throw new AIServiceException(
                    "AI service temporarily unavailable",
                    e
            );
        }
    }
}