package com.debugmind.backend.service;

import com.debugmind.backend.dto.DebugRequest;
import com.debugmind.backend.dto.DebugResponse;
import com.debugmind.backend.entity.DebugSession;
import com.debugmind.backend.entity.User;
import com.debugmind.backend.repository.DebugSessionRepository;
import com.debugmind.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DebugService {

    private final DebugSessionRepository debugSessionRepository;
    private final UserRepository userRepository;
    private final AIService aiService;

    public DebugResponse createDebugSession(
            String email,
            DebugRequest request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        DebugSession session = new DebugSession();

        session.setUser(user);
        session.setErrorMessage(request.getErrorMessage());
        session.setCode(request.getCode());
        session.setLanguage(request.getLanguage());

        // Temporary response until we connect the AI
        String aiResponse = aiService.analyzeCode(
                request.getErrorMessage(),
                request.getCode(),
                request.getLanguage()
        );

        session.setAiResponse(aiResponse);

        session.setCreatedAt(LocalDateTime.now());

        DebugSession saved =
                debugSessionRepository.save(session);

        return new DebugResponse(
                saved.getId(),
                saved.getErrorMessage(),
                saved.getCode(),
                saved.getLanguage(),
                saved.getAiResponse(),
                saved.getCreatedAt()
        );
    }
    public List<DebugResponse> getDebugHistory(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<DebugSession> sessions =
                debugSessionRepository
                        .findByUserIdOrderByCreatedAtDesc(user.getId());

        return sessions.stream()
                .map(session -> new DebugResponse(
                        session.getId(),
                        session.getErrorMessage(),
                        session.getCode(),
                        session.getLanguage(),
                        session.getAiResponse(),
                        session.getCreatedAt()
                ))
                .toList();
    }
}