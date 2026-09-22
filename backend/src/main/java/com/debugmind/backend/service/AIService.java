package com.debugmind.backend.service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import com.debugmind.backend.exception.AIServiceException;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

    private final ObjectMapper objectMapper;

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    public AIService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
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

                Analyze the following programming error.

                Programming language:
                %s

                Error message:
                %s

                Code:
                %s

                Give the response in this structure:

                1. Error Explanation
                2. Root Cause
                3. Exact Fix
                4. Corrected Code
                5. Best Practices

                Be technically accurate and explain the solution clearly.
                """.formatted(
                language,
                errorContext,
                code == null ? "No code provided." : code
        );
        try {

            RestClient client = RestClient.builder()
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

            String response = client.post()
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
}