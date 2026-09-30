package com.debugmind.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GitHubAnalyzeResponse {

    private String repositoryUrl;
    private String analysis;
}