package com.free_events.backend.service;

import com.free_events.backend.model.User;
import com.free_events.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    // Konstruktor bez użycia @Autowired wstrzykuje BCryptPasswordEncoder bezpośrednio.
    public UserService() {
        this.passwordEncoder = new BCryptPasswordEncoder();  // Tworzymy instancję BCryptPasswordEncoder
    }

    public boolean registerUser(User user) {
        // Sprawdzamy, czy użytkownik już istnieje w bazie
        if (userRepository.existsByEmail(user.getEmail())) {
            return false;  // Użytkownik już istnieje
        }

        // Haszowanie hasła przed zapisaniem
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Zapisujemy nowego użytkownika w bazie
        userRepository.save(user);
        return true;  // Rejestracja powiodła się
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);  // Wyszukiwanie użytkownika po emailu
    }
}
