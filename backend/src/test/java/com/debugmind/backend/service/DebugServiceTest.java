package com.debugmind.backend.service;

import com.debugmind.backend.repository.DebugSessionRepository;
import com.debugmind.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import com.debugmind.backend.dto.DebugRequest;
import com.debugmind.backend.dto.DebugResponse;
import com.debugmind.backend.entity.DebugSession;
import com.debugmind.backend.entity.User;
import com.debugmind.backend.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.debugmind.backend.exception.ForbiddenException;
class DebugServiceTest {

    private final DebugSessionRepository debugSessionRepository =
            mock(DebugSessionRepository.class);

    private final UserRepository userRepository =
            mock(UserRepository.class);

    private final AIService aiService =
            mock(AIService.class);

    private final DebugService debugService =
            new DebugService(
                    debugSessionRepository,
                    userRepository,
                    aiService
            );


    @Test
    void shouldCreateAndSaveDebugSession() {

        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        DebugRequest request = new DebugRequest();
        request.setErrorMessage("NullPointerException");
        request.setCode("String name = null; System.out.println(name.length());");
        request.setLanguage("Java");

        when(userRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(user));

        when(aiService.analyzeCode(
                request.getErrorMessage(),
                request.getCode(),
                request.getLanguage()
        )).thenReturn("The variable name is null.");

        when(debugSessionRepository.save(any(DebugSession.class)))
                .thenAnswer(invocation -> {
                    DebugSession session = invocation.getArgument(0);
                    session.setId(10L);
                    return session;
                });

        DebugResponse response =
                debugService.createDebugSession(
                        "test@example.com",
                        request
                );

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals("NullPointerException", response.getErrorMessage());
        assertEquals("Java", response.getLanguage());
        assertEquals(
                "The variable name is null.",
                response.getAiResponse()
        );

        verify(userRepository)
                .findByEmail("test@example.com");

        verify(aiService)
                .analyzeCode(
                        request.getErrorMessage(),
                        request.getCode(),
                        request.getLanguage()
                );

        verify(debugSessionRepository)
                .save(any(DebugSession.class));
    }
    @Test
    void shouldThrowExceptionWhenUserNotFound() {

        DebugRequest request = new DebugRequest();
        request.setErrorMessage("NullPointerException");
        request.setCode("String name = null;");
        request.setLanguage("Java");

        when(userRepository.findByEmail("unknown@example.com"))
                .thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> debugService.createDebugSession(
                        "unknown@example.com",
                        request
                )
        );

        assertEquals("User not found", exception.getMessage());

        verify(userRepository)
                .findByEmail("unknown@example.com");

        verifyNoInteractions(aiService);

        verifyNoInteractions(debugSessionRepository);
    }
    @Test
    void shouldReturnDebugHistoryForUser() {

        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        DebugSession session1 = new DebugSession();
        session1.setId(10L);
        session1.setUser(user);
        session1.setErrorMessage("NullPointerException");
        session1.setCode("String name = null;");
        session1.setLanguage("Java");
        session1.setAiResponse("Check for null before calling methods.");
        session1.setCreatedAt(LocalDateTime.now());

        DebugSession session2 = new DebugSession();
        session2.setId(11L);
        session2.setUser(user);
        session2.setErrorMessage("TypeError");
        session2.setCode("print(len(None))");
        session2.setLanguage("Python");
        session2.setAiResponse("None does not have a length.");
        session2.setCreatedAt(LocalDateTime.now());

        when(userRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(user));

        Page<DebugSession> page =
                new PageImpl<>(List.of(session1, session2));

        when(debugSessionRepository
                .findByUserIdOrderByCreatedAtDesc(
                        eq(1L),
                        any(Pageable.class)
                ))
                .thenReturn(page);

        Page<DebugResponse> history =
                debugService.getDebugHistory(
                        "test@example.com",
                        0,
                        10
                );

        assertNotNull(history);
        assertEquals(2, history.getContent().size());

        assertEquals(
                10L,
                history.getContent().get(0).getId()
        );

        assertEquals(
                "Java",
                history.getContent().get(0).getLanguage()
        );

        assertEquals(
                11L,
                history.getContent().get(1).getId()
        );

        assertEquals(
                "Python",
                history.getContent().get(1).getLanguage()
        );

        assertEquals(2, history.getTotalElements());
        assertEquals(1, history.getTotalPages());

        verify(userRepository)
                .findByEmail("test@example.com");

        verify(debugSessionRepository)
                .findByUserIdOrderByCreatedAtDesc(
                        eq(1L),
                        any(Pageable.class)
                );
    }

    @Test
    void shouldPreventUserFromDeletingAnotherUsersSession() {

        User currentUser = new User();
        currentUser.setId(1L);
        currentUser.setEmail("user1@example.com");

        User otherUser = new User();
        otherUser.setId(2L);
        otherUser.setEmail("user2@example.com");

        DebugSession session = new DebugSession();
        session.setId(20L);
        session.setUser(otherUser);

        when(userRepository.findByEmail("user1@example.com"))
                .thenReturn(Optional.of(currentUser));

        when(debugSessionRepository.findById(20L))
                .thenReturn(Optional.of(session));

        ForbiddenException exception = assertThrows(
                ForbiddenException.class,
                () -> debugService.deleteDebugSession(
                        "user1@example.com",
                        20L
                )
        );

        assertEquals(
                "You are not allowed to delete this session",
                exception.getMessage()
        );

        verify(debugSessionRepository, never())
                .delete(any(DebugSession.class));
    }
    @Test
    void shouldDeleteOwnDebugSession() {

        User currentUser = new User();
        currentUser.setId(1L);
        currentUser.setEmail("user1@example.com");

        DebugSession session = new DebugSession();
        session.setId(20L);
        session.setUser(currentUser);

        when(userRepository.findByEmail("user1@example.com"))
                .thenReturn(Optional.of(currentUser));

        when(debugSessionRepository.findById(20L))
                .thenReturn(Optional.of(session));

        debugService.deleteDebugSession(
                "user1@example.com",
                20L
        );

        verify(debugSessionRepository)
                .delete(session);
    }
}