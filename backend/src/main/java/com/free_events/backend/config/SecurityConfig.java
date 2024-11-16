package com.free_events.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Wyłączenie CSRF
                .csrf(csrf -> csrf.disable())  // Wyłączamy CSRF, ponieważ aplikacja działa na API

                // Autoryzacja dostępu do zasobów
                .authorizeRequests(authz -> authz
                        // Zezwalaj na dostęp do endpointów rejestracji i powitania
                        .requestMatchers("/api/users/register", "/api/users/hello").permitAll()
                        // Wymagaj autoryzacji dla innych endpointów
                        .anyRequest().permitAll()
                );



        return http.build();
    }
}
