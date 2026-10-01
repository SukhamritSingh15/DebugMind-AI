package com.debugmind.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.debugmind.backend.exception.GitHubRepositoryException;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleEmailAlreadyExists(
            EmailAlreadyExistsException exception) {

        ApiError error = new ApiError(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);
    }

    @ExceptionHandler(AIServiceException.class)
    public ResponseEntity<ApiError> handleAIServiceException(
            AIServiceException exception) {

        ApiError error = new ApiError(
                HttpStatus.BAD_GATEWAY.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body(error);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiError> handleForbiddenException(
            ForbiddenException exception) {

        ApiError error = new ApiError(
                HttpStatus.FORBIDDEN.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        ApiError apiError = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(apiError);
    }
    @ExceptionHandler(GitHubRepositoryException.class)
    public ResponseEntity<ApiError> handleGitHubRepositoryException(
            GitHubRepositoryException exception) {

        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFoundException(
            ResourceNotFoundException exception) {

        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiError> handleInvalidCredentialsException(
            InvalidCredentialsException exception) {

        ApiError error = new ApiError(
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(error);
    }
}