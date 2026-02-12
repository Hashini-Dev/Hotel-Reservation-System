package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // CREATE
    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable int id, @RequestBody BookingRequest request) {
        return bookingService.updateBooking(id, request);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable int id) {
        return bookingService.getBookingById(id);
    }

    // GET BOOKINGS OF USER
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable int userId) {
        return bookingService.getBookingsByUser(userId);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully");
    }

    // GET RESERVED DAYS OF A ROOM
    @GetMapping("/room/{roomId}/booked-dates")
    public List<LocalDate> getBookedDates(@PathVariable int roomId) {
        return bookingService.getBookedDates(roomId);
    }
}
