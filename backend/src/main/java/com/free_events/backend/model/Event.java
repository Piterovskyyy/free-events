package com.free_events.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "events")
public class Event {

    @Id
    private String id;
    private String name;
    private String description;
    private String location;
    private LocalDateTime eventDate;
    private String organizerId;
    private String imageUrl;
    private List<String> registeredUserIds = new ArrayList<>();

    // Konstruktor
    public Event() {}

    public Event(
            String name,
            String description,
            String location,
            LocalDateTime eventDate,
            String organizerId,
            String imageUrl,
            List<String> registeredUserIds) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.eventDate = eventDate;
        this.organizerId = organizerId;
        this.imageUrl = imageUrl;
        this.registeredUserIds = registeredUserIds;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(String organizerId) {
        this.organizerId = organizerId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getRegisteredUserIds() {
        return registeredUserIds;
    }

    public void setRegisteredUserIds(List<String> registeredUserIds) {
        this.registeredUserIds = registeredUserIds;
    }
}
