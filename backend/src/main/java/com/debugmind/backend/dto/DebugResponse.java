package com.debugmind.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DebugResponse {

    private Long id;
    private String errorMessage;
    private String code;
    private String language;
    private String aiResponse;
    private LocalDateTime createdAt;

}