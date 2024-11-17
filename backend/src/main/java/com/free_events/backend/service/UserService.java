package com.free_events.backend.service;

import com.free_events.backend.model.LoginRequestBody;
import com.free_events.backend.model.User;
import com.free_events.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return false;
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);
        return true;
    }

    public boolean authenticateUser(LoginRequestBody user) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));

        if (userOptional.isPresent()) {
            User userInDatabase = userOptional.get();
            return passwordEncoder.matches(user.getPassword(), userInDatabase.getPassword());
        }
        return false;
    }
}
