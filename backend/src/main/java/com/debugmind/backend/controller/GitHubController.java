package com.debugmind.backend.controller;

import com.debugmind.backend.dto.GitHubAnalyzeRequest;
import com.debugmind.backend.dto.GitHubAnalyzeResponse;
import com.debugmind.backend.service.GitHubAnalysisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/github")
@RequiredArgsConstructor
public class GitHubController {

    private final GitHubAnalysisService gitHubAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<GitHubAnalyzeResponse> analyzeRepository(
            @Valid @RequestBody GitHubAnalyzeRequest request
    ) {
        String analysis =
                gitHubAnalysisService.analyzeRepository(
                        request.getRepositoryUrl()
                );

        GitHubAnalyzeResponse response =
                new GitHubAnalyzeResponse(
                        request.getRepositoryUrl(),
                        analysis
                );

        return ResponseEntity.ok(response);
    }
}