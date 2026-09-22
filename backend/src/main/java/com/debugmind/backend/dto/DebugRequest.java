package com.debugmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DebugRequest {


    private String errorMessage;

    @NotBlank(message = "Code is required")
    private String code;

    @NotBlank(message = "Programming language is required")
    private String language;
}