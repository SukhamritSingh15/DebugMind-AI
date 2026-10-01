package com.debugmind.backend.service;

import com.debugmind.backend.dto.DebugRequest;
import com.debugmind.backend.dto.DebugResponse;
import com.debugmind.backend.entity.DebugSession;
import com.debugmind.backend.entity.User;
import com.debugmind.backend.repository.DebugSessionRepository;
import com.debugmind.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.debugmind.backend.exception.ForbiddenException;
import com.debugmind.backend.exception.ResourceNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

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
                        new ResourceNotFoundException("User not found"));

        DebugSession session = new DebugSession();

        session.setUser(user);
        session.setErrorMessage(request.getErrorMessage());
        session.setCode(request.getCode());
        session.setLanguage(request.getLanguage());
        session.setCreatedAt(LocalDateTime.now());

        String aiResponse = aiService.analyzeCode(
                request.getErrorMessage(),
                request.getCode(),
                request.getLanguage()
        );

        session.setAiResponse(aiResponse);

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

    public Page<DebugResponse> getDebugHistory(
            String email,
            int page,
            int size
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), 50);

        PageRequest pageable =
                PageRequest.of(safePage, safeSize);

        Page<DebugSession> sessions =
                debugSessionRepository
                        .findByUserIdOrderByCreatedAtDesc(
                                user.getId(),
                                pageable
                        );

        return sessions.map(session -> new DebugResponse(
                session.getId(),
                session.getErrorMessage(),
                session.getCode(),
                session.getLanguage(),
                session.getAiResponse(),
                session.getCreatedAt()
        ));
    }

    public void deleteDebugSession(String email, Long sessionId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        DebugSession session = debugSessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Debug session not found"));

        if (!session.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException(
                    "You are not allowed to delete this session"
            );
        }

        debugSessionRepository.delete(session);
    }
}