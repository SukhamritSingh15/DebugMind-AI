package com.debugmind.backend.controller;

import com.debugmind.backend.service.GitHubAnalysisService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GitHubController.class)
@AutoConfigureMockMvc(addFilters = false)
class GitHubControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GitHubAnalysisService gitHubAnalysisService;

    @Test
    void analyzeRepository_returns200WithAnalysis() throws Exception {

        String repositoryUrl =
                "https://github.com/user/project";

        String analysis =
                "Project analysis result";

        when(gitHubAnalysisService.analyzeRepository(repositoryUrl))
                .thenReturn(analysis);

        mockMvc.perform(
                        post("/api/github/analyze")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                {
                                    "repositoryUrl": "https://github.com/user/project"
                                }
                                """)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.repositoryUrl")
                        .value(repositoryUrl))
                .andExpect(jsonPath("$.analysis")
                        .value(analysis));

        verify(gitHubAnalysisService)
                .analyzeRepository(repositoryUrl);
    }

    @Test
    void analyzeRepository_withInvalidUrl_returns400() throws Exception {

        mockMvc.perform(
                        post("/api/github/analyze")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                {
                                    "repositoryUrl": "not-a-github-url"
                                }
                                """)
                )
                .andExpect(status().isBadRequest());

        verifyNoInteractions(gitHubAnalysisService);
    }

    @Test
    void analyzeRepository_withBlankUrl_returns400() throws Exception {

        mockMvc.perform(
                        post("/api/github/analyze")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                {
                                    "repositoryUrl": ""
                                }
                                """)
                )
                .andExpect(status().isBadRequest());

        verifyNoInteractions(gitHubAnalysisService);
    }
}