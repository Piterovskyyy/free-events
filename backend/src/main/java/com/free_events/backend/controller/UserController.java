package com.free_events.backend.controller;

import com.free_events.backend.model.User;
import com.free_events.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);

        if (isRegistered) {
            return "User successfully registered!";
        } else {
            return "Registration failed! User might already exist.";
        }
    }
}
