package com.free_events.backend.controller;

import com.free_events.backend.model.LoginRequestBody;
import com.free_events.backend.model.User;
import com.free_events.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);

        if (isRegistered) {
            return ResponseEntity.ok("User successfully registered!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Rejestracja nie powiodła się.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestBody user) {
        boolean isAuthenticated = userService.authenticateUser(user);

        if (isAuthenticated) {
            User userByEmail = userService.getUserByEmail(user.getEmail());
            return ResponseEntity.ok(userByEmail);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Niepoprawne dane logowania.");
        }
    }
}
