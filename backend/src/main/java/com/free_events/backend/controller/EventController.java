package com.free_events.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.free_events.backend.model.Event;
import com.free_events.backend.model.EventRequest;
import com.free_events.backend.service.EventService;
import com.free_events.backend.service.FirebaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventService eventService;
    private final FirebaseStorageService firebaseStorageService;

    @Autowired
    public EventController(EventService eventService,FirebaseStorageService firebaseStorageService) {
        this.eventService = eventService;
        this.firebaseStorageService = firebaseStorageService;
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(
            @RequestPart("event") String eventRequestJson,
            @RequestPart("image") MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            EventRequest eventRequest = objectMapper.readValue(eventRequestJson, EventRequest.class);
            String imageUrl = firebaseStorageService.uploadFile(image);

            Event event = new Event(
                    eventRequest.getName(),
                    eventRequest.getDescription(),
                    eventRequest.getLocation(),
                    LocalDateTime.parse(eventRequest.getEventDate()),
                    eventRequest.getOrganizerId(),
                    imageUrl
            );
            Event createdEvent = eventService.createEvent(event);

            return ResponseEntity.ok(createdEvent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/by-organizer")
    public ResponseEntity<List<Event>> getEventsByOrganizer(@RequestParam String organizerId) {
        List<Event> events = eventService.getEventsByOrganizerId(organizerId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String name) {
        List<Event> events = eventService.searchEventsByName(name);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/by-dates")
    public ResponseEntity<List<Event>> getEventsByDates(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        List<Event> events = eventService.getEventsBetweenDates(startDate, endDate);
        return ResponseEntity.ok(events);
    }
}
