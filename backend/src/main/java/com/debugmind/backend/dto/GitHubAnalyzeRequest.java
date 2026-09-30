package com.debugmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GitHubAnalyzeRequest {

    @NotBlank(message = "Repository URL is required")
    @Pattern(
            regexp = "^https://github\\.com/[^/]+/[^/]+/?$",
            message = "Please provide a valid GitHub repository URL"
    )
    private String repositoryUrl;
}