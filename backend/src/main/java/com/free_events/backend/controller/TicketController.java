package com.free_events.backend.controller;

import com.free_events.backend.model.Event;
import com.free_events.backend.service.EventService;
import com.free_events.backend.service.PdfTicketGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final EventService eventService;
    private final PdfTicketGenerator pdfTicketGenerator;

    @Autowired
    public TicketController(EventService eventService, PdfTicketGenerator pdfTicketGenerator) {
        this.eventService = eventService;
        this.pdfTicketGenerator = pdfTicketGenerator;
    }

    @GetMapping("/{eventId}/generate")
    public ResponseEntity<byte[]> generateTicket(
            @PathVariable String eventId,
            @RequestParam String attendeeName,
            @RequestParam String ticketNumber) {
        try {
            // Retrieve the event from the database
            Event event = eventService.getEventById(eventId);
            if (event == null) {
                return ResponseEntity.notFound().build();
            }

            // Generate PDF ticket
            byte[] pdfBytes = pdfTicketGenerator.generateTicket(event, attendeeName, ticketNumber);

            // Prepare response with PDF file
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
}
