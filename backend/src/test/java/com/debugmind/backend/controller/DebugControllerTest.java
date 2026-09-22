package com.debugmind.backend.controller;

import com.debugmind.backend.service.DebugService;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
import com.debugmind.backend.dto.DebugRequest;
import com.debugmind.backend.dto.DebugResponse;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import com.debugmind.backend.exception.AIServiceException;
import com.debugmind.backend.exception.GlobalExceptionHandler;
class DebugControllerTest {

    private final DebugService debugService =
            org.mockito.Mockito.mock(DebugService.class);

    private final LocalValidatorFactoryBean validator =
            new LocalValidatorFactoryBean();

    private final MockMvc mockMvc;

    DebugControllerTest() {
        validator.afterPropertiesSet();

        mockMvc = standaloneSetup(new DebugController(debugService))
                .setValidator(validator)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void shouldRejectEmptyDebugRequest() throws Exception {

        String requestBody = """
                {
                    "errorMessage": "",
                    "code": "",
                    "language": ""
                }
                """;

        mockMvc.perform(
                        post("/api/debug")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                )
                .andExpect(status().isBadRequest());
    }
    @Test
    void shouldCreateDebugSession() throws Exception {

        DebugResponse response = new DebugResponse(
                1L,
                "NullPointerException",
                "String name = null;\nSystem.out.println(name.length());",
                "Java",
                "The variable name is null. Use a null check before calling length().",
                LocalDateTime.now()
        );

        when(debugService.createDebugSession(
                eq("test@example.com"),
                any(DebugRequest.class)
        )).thenReturn(response);

        Authentication authentication =
                org.mockito.Mockito.mock(Authentication.class);

        when(authentication.getName())
                .thenReturn("test@example.com");

        String requestBody = """
            {
                "errorMessage": "NullPointerException",
                "code": "String name = null; System.out.println(name.length());",
                "language": "Java"
            }
            """;

        mockMvc.perform(
                        post("/api/debug")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                                .principal(authentication)
                )
                .andExpect(status().isOk());

        verify(debugService).createDebugSession(
                eq("test@example.com"),
                any(DebugRequest.class)
        );
    }
    @Test
    void shouldReturnBadGatewayWhenAIServiceFails() throws Exception {

        when(debugService.createDebugSession(
                eq("test@example.com"),
                any(DebugRequest.class)
        )).thenThrow(
                new AIServiceException("AI service temporarily unavailable")
        );

        Authentication authentication =
                org.mockito.Mockito.mock(Authentication.class);

        when(authentication.getName())
                .thenReturn("test@example.com");

        String requestBody = """
            {
                "errorMessage": "NullPointerException",
                "code": "String name = null; System.out.println(name.length());",
                "language": "Java"
            }
            """;

        mockMvc.perform(
                        post("/api/debug")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                                .principal(authentication)
                )
                .andExpect(status().isBadGateway());
    }
    @Test
    void shouldAllowDebuggingWithoutErrorMessage() throws Exception {

        DebugResponse response = new DebugResponse(
                2L,
                "",
                "String name = null;\nSystem.out.println(name.length());",
                "Java",
                "The code contains a potential NullPointerException because name is null.",
                LocalDateTime.now()
        );

        when(debugService.createDebugSession(
                eq("test@example.com"),
                any(DebugRequest.class)
        )).thenReturn(response);

        Authentication authentication =
                org.mockito.Mockito.mock(Authentication.class);

        when(authentication.getName())
                .thenReturn("test@example.com");

        String requestBody = """
        {
            "errorMessage": "",
            "code": "String name = null; System.out.println(name.length());",
            "language": "Java"
        }
        """;

        mockMvc.perform(
                        post("/api/debug")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                                .principal(authentication)
                )
                .andExpect(status().isOk());

        verify(debugService).createDebugSession(
                eq("test@example.com"),
                any(DebugRequest.class)
        );
    }
}