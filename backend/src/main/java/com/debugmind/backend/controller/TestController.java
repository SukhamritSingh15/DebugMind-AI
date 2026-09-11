package com.debugmind.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController                     //tells Spring this class handles HTTP requests.
public class TestController {

    @GetMapping("/api/test")      //creates a GET API endpoint at /api/test
    public String test() {          //test() runs when someone visits that endpoint.
        return "DebugMind AI backend is working!";
    }
}