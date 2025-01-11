package com.free_events.backend.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.springframework.core.io.ClassPathResource;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.awt.Color;
import java.awt.image.BufferedImage;

import org.springframework.stereotype.Service;
import com.free_events.backend.model.Event;

@Service
public class PdfTicketGenerator {

    private PDImageXObject generateQRCode(PDDocument document, String content, int width, int height) throws Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, width, height);

        BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "PNG", baos);

        return PDImageXObject.createFromByteArray(document, baos.toByteArray(), "QR Code");
    }

    public byte[] generateTicket(Event event, String attendeeName, String ticketNumber) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage(PDRectangle.A4);
        document.addPage(page);

        // Load Unicode font
        PDType0Font font = PDType0Font.load(document, new ClassPathResource("fonts/arial.ttf").getInputStream());
        PDType0Font boldFont = PDType0Font.load(document, new ClassPathResource("fonts/arial.ttf").getInputStream());

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        String formattedDate = event.getEventDate().format(DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy"));
        String formattedTime = event.getEventDate().format(DateTimeFormatter.ofPattern("HH:mm"));

        // Draw background rectangle
        contentStream.setNonStrokingColor(new Color(245, 245, 245));
        contentStream.addRect(50, 50, PDRectangle.A4.getWidth() - 100, PDRectangle.A4.getHeight() - 100);
        contentStream.fill();

        // Draw header
        contentStream.setNonStrokingColor(new Color(41, 128, 185));
        contentStream.addRect(50, PDRectangle.A4.getHeight()-120, PDRectangle.A4.getWidth() - 100, 100);
        contentStream.fill();

        // Event Title
        contentStream.beginText();
        contentStream.setNonStrokingColor(Color.WHITE);
        contentStream.setFont(boldFont, 24);
        contentStream.newLineAtOffset(70, PDRectangle.A4.getHeight() - 80);
        contentStream.showText(event.getName());
        contentStream.endText();

        // Main content
        float yStart = PDRectangle.A4.getHeight() - 150 ;
        float xStart = 70;
        float lineHeight = 25;

        contentStream.setNonStrokingColor(Color.BLACK);

        // Attendee Information
        contentStream.beginText();
        contentStream.setFont(boldFont, 16);
        contentStream.newLineAtOffset(xStart, yStart);
        contentStream.showText("Informacje o uczestniku");
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(font, 12);
        contentStream.newLineAtOffset(xStart, yStart - lineHeight);
        contentStream.showText("Imię i nazwisko: " + attendeeName);
        contentStream.newLineAtOffset(0, -lineHeight);
        contentStream.showText("Numer biletu: " + ticketNumber);
        contentStream.endText();

        // Event Details
        contentStream.beginText();
        contentStream.setFont(boldFont, 16);
        contentStream.newLineAtOffset(xStart, yStart - (lineHeight * 4));
        contentStream.showText("Szczegóły wydarzenia");
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(font, 12);
        contentStream.newLineAtOffset(xStart, yStart - (lineHeight * 5));
        contentStream.showText("Data: " + formattedDate);
        contentStream.newLineAtOffset(0, -lineHeight);
        contentStream.showText("Godzina: " + formattedTime);
        contentStream.newLineAtOffset(0, -lineHeight);
        contentStream.showText("Lokalizacja: " + event.getLocation());
        contentStream.endText();

        // Generate and draw QR Code
        try {
            String qrContent = String.format("Wydarzenie: %s\nBilet: %s\nUczestnik: %s",
                    event.getName(), ticketNumber, attendeeName);
            PDImageXObject qrCode = generateQRCode(document, qrContent, 200, 200);
            contentStream.drawImage(qrCode, PDRectangle.A4.getWidth() - 220, yStart - (lineHeight * 5), 150, 150);
        } catch (Exception e) {
            // If QR generation fails, draw placeholder
            contentStream.addRect(PDRectangle.A4.getWidth() - 200, yStart - (lineHeight * 5), 100, 100);
            contentStream.stroke();
        }

        // Footer
        float footerY = 100;
        contentStream.setNonStrokingColor(new Color(41, 128, 185));
        contentStream.addRect(50, footerY - 30, PDRectangle.A4.getWidth() - 100, 2);
        contentStream.fill();

        contentStream.beginText();
        contentStream.setFont(font, 10);
        contentStream.setNonStrokingColor(Color.GRAY);
        contentStream.newLineAtOffset(xStart, footerY - 20);
        contentStream.showText("Ten bilet jest ważny tylko przy jednym wejściu. Proszę okazać bilet przy wejściu na wydarzenie.");
        contentStream.endText();

        contentStream.close();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.save(outputStream);
        document.close();

        return outputStream.toByteArray();
    }
}
