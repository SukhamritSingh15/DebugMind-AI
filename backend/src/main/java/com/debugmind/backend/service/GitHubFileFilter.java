package com.debugmind.backend.service;

import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class GitHubFileFilter {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            ".java",
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".py",
            ".cpp",
            ".c",
            ".h",
            ".html",
            ".css",
            ".sql",
            ".xml",
            ".properties",
            ".yml",
            ".yaml"
    );

    private static final Set<String> IGNORED_DIRECTORIES = Set.of(
            ".git",
            "node_modules",
            "target",
            "dist",
            "build"
    );

    public boolean shouldInclude(String path) {

        String normalizedPath = path.toLowerCase();

        for (String directory : IGNORED_DIRECTORIES) {
            if (normalizedPath.contains("/" + directory + "/")
                    || normalizedPath.startsWith(directory + "/")) {
                return false;
            }
        }

        return ALLOWED_EXTENSIONS.stream()
                .anyMatch(normalizedPath::endsWith);
    }

    public int getPriority(String path) {

        String normalizedPath = path.toLowerCase();

        // Highest priority: security and authentication
        if (normalizedPath.contains("securityconfig")
                || normalizedPath.contains("jwtauthenticationfilter")
                || normalizedPath.contains("jwtutil")) {
            return 1;
        }

        // Build and project configuration
        if (normalizedPath.endsWith("pom.xml")
                || normalizedPath.endsWith("application.properties")
                || normalizedPath.endsWith("application.yml")
                || normalizedPath.endsWith("application.yaml")
                || normalizedPath.endsWith("docker-compose.yml")
                || normalizedPath.endsWith("docker-compose.yaml")) {
            return 2;
        }

        // AI and external-service logic
        if (normalizedPath.contains("aiservice")
                || normalizedPath.contains("githubservice")
                || normalizedPath.contains("analysisservice")) {
            return 3;
        }

        // Other business/service layer
        if (normalizedPath.contains("/service/")) {
            return 4;
        }

        // Controllers / API layer
        if (normalizedPath.contains("/controller/")) {
            return 5;
        }

        // Entities / database layer
        if (normalizedPath.contains("/entity/")
                || normalizedPath.contains("/repository/")) {
            return 6;
        }

        // DTOs
        if (normalizedPath.contains("/dto/")) {
            return 7;
        }

        // Other configuration
        if (normalizedPath.contains("/config/")) {
            return 8;
        }

        // Everything else
        return 10;
    }
}