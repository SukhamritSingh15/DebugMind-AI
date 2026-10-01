package com.debugmind.backend.repository;

import com.debugmind.backend.entity.DebugSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DebugSessionRepository
        extends JpaRepository<DebugSession, Long> {

        Page<DebugSession> findByUserIdOrderByCreatedAtDesc(
            Long userId,
            Pageable pageable
    );
}