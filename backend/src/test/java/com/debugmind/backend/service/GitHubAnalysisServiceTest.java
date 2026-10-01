package com.debugmind.backend.service;

import com.debugmind.backend.exception.GitHubRepositoryException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GitHubAnalysisServiceTest {

    @Mock
    private GitHubService gitHubService;

    @Mock
    private AIService aiService;

    @InjectMocks
    private GitHubAnalysisService gitHubAnalysisService;

    @Test
    void analyzeRepository_returnsAiAnalysis() {

        String repositoryUrl = "https://github.com/user/project";
        String repositoryContext = "repository context";
        String expectedAnalysis = "AI repository analysis";

        when(gitHubService.buildRepositoryContext(repositoryUrl))
                .thenReturn(repositoryContext);

        when(aiService.analyzeRepository(
                repositoryUrl,
                repositoryContext
        )).thenReturn(expectedAnalysis);

        String result =
                gitHubAnalysisService.analyzeRepository(repositoryUrl);

        assertThat(result).isEqualTo(expectedAnalysis);

        verify(gitHubService).buildRepositoryContext(repositoryUrl);
        verify(aiService).analyzeRepository(
                repositoryUrl,
                repositoryContext
        );
    }

    @Test
    void analyzeRepository_whenGitHubFails_doesNotCallAiService() {

        String repositoryUrl = "https://github.com/user/project";

        GitHubRepositoryException exception =
                new GitHubRepositoryException(
                        "GitHub repository not found or inaccessible"
                );

        when(gitHubService.buildRepositoryContext(repositoryUrl))
                .thenThrow(exception);

        assertThatThrownBy(() ->
                gitHubAnalysisService.analyzeRepository(repositoryUrl)
        ).isSameAs(exception);

        verify(gitHubService)
                .buildRepositoryContext(repositoryUrl);

        verifyNoInteractions(aiService);
    }
}