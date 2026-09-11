package com.debugmind.backend.controller;

import com.debugmind.backend.dto.AuthResponse;
import com.debugmind.backend.dto.RegisterRequest;
import com.debugmind.backend.entity.User;
import com.debugmind.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.debugmind.backend.dto.LoginRequest;
import com.debugmind.backend.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        AuthResponse response = new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = userService.authenticateUser(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok(response);
    }
}