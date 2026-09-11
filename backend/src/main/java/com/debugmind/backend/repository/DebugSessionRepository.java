package com.debugmind.backend.repository;

import com.debugmind.backend.entity.DebugSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DebugSessionRepository
        extends JpaRepository<DebugSession, Long> {

    List<DebugSession> findByUserIdOrderByCreatedAtDesc(Long userId);
}