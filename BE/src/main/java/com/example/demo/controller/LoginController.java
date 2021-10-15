package com.example.demo.controller;

import com.example.demo.model.request.LoginRequest;
import com.example.demo.model.response.LoginResponse;
import com.example.demo.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

    LoginService loginService;

    @PostMapping()
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(loginService.login(loginRequest));
    }
}
