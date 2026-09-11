package com.debugmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DebugRequest {

    @NotBlank(message = "Error message is required")
    private String errorMessage;

    private String code;

    @NotBlank(message = "Programming language is required")
    private String language;
}