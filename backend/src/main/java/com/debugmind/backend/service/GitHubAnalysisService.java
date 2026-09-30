package com.debugmind.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GitHubAnalysisService {

    private final GitHubService gitHubService;
    private final AIService aiService;

    public String analyzeRepository(String repositoryUrl) {

        String repositoryContext =
                gitHubService.buildRepositoryContext(repositoryUrl);

        return aiService.analyzeRepository(
                repositoryUrl,
                repositoryContext
        );
    }
}