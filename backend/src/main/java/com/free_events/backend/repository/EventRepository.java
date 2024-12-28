package com.free_events.backend.repository;

import com.free_events.backend.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByOrganizerId(String organizerId);

    List<Event> findByNameContainingIgnoreCase(String name);

    List<Event> findByEventDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
