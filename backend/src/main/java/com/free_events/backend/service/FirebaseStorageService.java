package com.free_events.backend.service;

import com.google.firebase.cloud.StorageClient;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Blob;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FirebaseStorageService {

    public String uploadFile(MultipartFile file) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();
        String fileName = "events/" + System.currentTimeMillis() + "-" + file.getOriginalFilename();

        Blob blob = bucket.create(fileName, file.getInputStream(), file.getContentType());

        String fileUrl = String.format(
                "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                bucket.getName(),
                fileName.replace("/", "%2F")
        );

        return fileUrl;
    }
}
