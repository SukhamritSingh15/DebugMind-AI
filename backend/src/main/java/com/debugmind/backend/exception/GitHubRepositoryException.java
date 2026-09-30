package com.debugmind.backend.exception;

public class GitHubRepositoryException extends RuntimeException {

    public GitHubRepositoryException(String message) {
        super(message);
    }
}