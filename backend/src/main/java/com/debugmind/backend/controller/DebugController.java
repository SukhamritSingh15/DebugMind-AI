package com.debugmind.backend.controller;

import com.debugmind.backend.dto.DebugRequest;
import com.debugmind.backend.dto.DebugResponse;
import com.debugmind.backend.entity.DebugSession;
import com.debugmind.backend.service.DebugService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {

    private final DebugService debugService;

    @PostMapping
    public ResponseEntity<DebugResponse> debug(
            @Valid @RequestBody DebugRequest request,
            Authentication authentication
    ) {

        DebugResponse response =
                debugService.createDebugSession(
                        authentication.getName(),
                        request
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<DebugResponse>> getHistory(
            Authentication authentication
    ) {

        List<DebugResponse> history =
                debugService.getDebugHistory(
                        authentication.getName()
                );

        return ResponseEntity.ok(history);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDebugSession(
            @PathVariable Long id,
            Authentication authentication
    ) {
        debugService.deleteDebugSession(
                authentication.getName(),
                id
        );

        return ResponseEntity.noContent().build();
    }
}