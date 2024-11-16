package com.free_events.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // Określa nazwę kolekcji w MongoDB
public class User {

    @Id // Oznacza, że to pole jest identyfikatorem użytkownika
    private String id;

    private String name; // Imię użytkownika
    private String email; // Email użytkownika
    private String password; // Hasło użytkownika (w rzeczywistości powinno być zaszyfrowane)

    // Konstruktor bez argumentów, wymagany przez Spring Data
    public User() {}

    // Konstruktor z parametrami
    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Gettery i settery dla każdego pola
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
