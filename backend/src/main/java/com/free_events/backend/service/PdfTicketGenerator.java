package com.free_events.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import com.free_events.backend.model.Event;

@Service
public class PdfTicketGenerator {

    public byte[] generateTicket(Event event, String attendeeName, String ticketNumber) throws IOException {
        // Create a new PDF document
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        // Set up the content stream
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
        contentStream.newLineAtOffset(100, 700);
        contentStream.showText("Ticket for Event: " + event.getName());
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA, 12);
        contentStream.newLineAtOffset(100, 650);
        contentStream.showText("Attendee: " + attendeeName);
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Ticket Number: " + ticketNumber);
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Event Details:");
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Name: " + event.getName());
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Description: " + event.getDescription());
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Location: " + event.getLocation());
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("Date: " + event.getEventDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        contentStream.endText();

        contentStream.close();

        // Save the PDF to a byte array
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }
}
