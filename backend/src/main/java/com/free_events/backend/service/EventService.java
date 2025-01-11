package com.free_events.backend.service;

import com.free_events.backend.model.Event;
import com.free_events.backend.repository.EventRepository;
import com.free_events.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public Event getEventById(String eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

    public List<Event> getEventsByOrganizerId(String organizerId) {
        return eventRepository.findByOrganizerId(organizerId);
    }

    public Optional<Event> findNearestEvent() {
        return eventRepository.findTopByEventDateGreaterThanEqualOrderByEventDateAsc(new Date());
    }

    public List<Event> searchEventsByName(String name) {
        return eventRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Event> getEventsBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return eventRepository.findByEventDateBetween(startDate, endDate);
    }

    public List<Event> getPastEvents() {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByEventDateBefore(now);
    }

    public List<Event> getUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByEventDateAfter(now);
    }

    public List<Event> getTodayEvents() {
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1).minusSeconds(1);
        return eventRepository.findByEventDateBetween(startOfDay, endOfDay);
    }

    public String registerUserToEvent(String eventId, String userId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isEmpty()) {
            throw new IllegalArgumentException("Event not found");
        }

        Event event = eventOpt.get();

        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }

        if (event.getRegisteredUserIds().contains(userId)) {
            throw new IllegalStateException("User already registered for this event");
        }

        event.getRegisteredUserIds().add(userId);
        eventRepository.save(event);

        return "User successfully registered for the event";
    }


    public List<Event> getEventsByRegisteredUserId(String userId) {
        return eventRepository.findAll().stream()
                .filter(event -> event.getRegisteredUserIds().contains(userId))
                .collect(Collectors.toList());
    }

}
