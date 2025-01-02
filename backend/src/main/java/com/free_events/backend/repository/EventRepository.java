package com.free_events.backend.repository;

import com.free_events.backend.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByOrganizerId(String organizerId);

    List<Event> findByNameContainingIgnoreCase(String name);

    List<Event> findByEventDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Event> findByEventDateBefore(LocalDateTime dateTime);

    List<Event> findByEventDateAfter(LocalDateTime dateTime);

    Optional<Event> findTopByEventDateGreaterThanEqualOrderByEventDateAsc(Date date);
}
