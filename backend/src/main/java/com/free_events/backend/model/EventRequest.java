package com.free_events.backend.model;

public class EventRequest {

    private String name;
    private String description;
    private String location;
    private String eventDate;
    private String organizerId;

    public EventRequest() {}

    public EventRequest(String name, String description, String location, String eventDate, String organizerId) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.eventDate = eventDate;
        this.organizerId = organizerId;
    }

    // Gettery i Settery
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

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(String organizerId) {
        this.organizerId = organizerId;
    }
}
