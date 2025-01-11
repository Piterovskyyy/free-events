package com.free_events.backend.controller;

import com.free_events.backend.model.Event;
import com.free_events.backend.service.EventService;
import com.free_events.backend.service.PdfTicketGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    private final EventService eventService;
    private final PdfTicketGenerator pdfTicketGenerator;

    @Autowired
    public TicketController(EventService eventService, PdfTicketGenerator pdfTicketGenerator) {
        this.eventService = eventService;
        this.pdfTicketGenerator = pdfTicketGenerator;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TicketInterface>> getAllTickets(@RequestParam String userId) {
        try {
            List<Event> registeredEvents = eventService.getEventsByRegisteredUserId(userId);

            List<TicketInterface> tickets = registeredEvents.stream().map(event -> {
                String status = event.getEventDate().isAfter(LocalDateTime.now()) ? "active" : "expired";
                String ticketNumber = UUID.randomUUID().toString(); // Generowanie losowego ticketNumber
                return new TicketInterface(
                        event.getId(),
                        event.getId(),
                        event.getName(),
                        event.getEventDate().toString(),
                        status,
                        ticketNumber
                );
            }).collect(Collectors.toList());

            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{eventId}/download")
    public ResponseEntity<byte[]> generateTicket(
            @PathVariable String eventId,
            @RequestParam String attendeeName,
            @RequestParam String ticketNumber) {
        try {
            Event event = eventService.getEventById(eventId);
            if (event == null) {
                return ResponseEntity.notFound().build();
            }
            System.out.println("123" );
            byte[] pdfBytes = pdfTicketGenerator.generateTicket(event, attendeeName, ticketNumber);
            System.out.println("PDF bytes: " + pdfBytes.length);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=ticket_" + ticketNumber + ".pdf");
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    public static class TicketInterface {
        private String id;
        private String eventId;
        private String eventName;
        private String eventDate;
        private String status;
        private String ticketNumber;

        public TicketInterface(String id, String eventId, String eventName, String eventDate, String status, String ticketNumber) {
            this.id = id;
            this.eventId = eventId;
            this.eventName = eventName;
            this.eventDate = eventDate;
            this.status = status;
            this.ticketNumber = ticketNumber;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getEventId() {
            return eventId;
        }

        public void setEventId(String eventId) {
            this.eventId = eventId;
        }

        public String getEventName() {
            return eventName;
        }

        public void setEventName(String eventName) {
            this.eventName = eventName;
        }

        public String getEventDate() {
            return eventDate;
        }

        public void setEventDate(String eventDate) {
            this.eventDate = eventDate;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getTicketNumber() {
            return ticketNumber;
        }

        public void setTicketNumber(String ticketNumber) {
            this.ticketNumber = ticketNumber;
        }
    }
}
