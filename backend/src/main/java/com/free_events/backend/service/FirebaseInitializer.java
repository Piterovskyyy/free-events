package com.free_events.backend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

// D:\Projekty\Uczelnia\free-events\backend\src\main\resources\firebase-service-account.json
// C:\Users\jakub\Desktop\free-events\backend\src\main\resources\firebase-service-account.json

@Service
public class FirebaseInitializer {
    @PostConstruct
    public void initialize() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("D:\\Projekty\\Uczelnia\\free-events\\backend\\src\\main\\resources\\firebase-service-account.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("free-events.firebasestorage.app")
                .build();

        FirebaseApp.initializeApp(options);

    }
}
