package com.example.backend.controller;

import com.example.backend.entity.User_Entity;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public User_Entity getCurrentUser() {
        return userService.getCurrentUser();
    }
}
