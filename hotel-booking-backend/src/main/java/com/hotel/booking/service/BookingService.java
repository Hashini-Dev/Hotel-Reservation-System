package com.hotel.booking.service;

import com.hotel.booking.dto.BookingRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.BookingStatus;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.BookingStatusRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingStatusRepository bookingStatusRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    // ---------------- CREATE BOOKING ----------------
    public Booking createBooking(BookingRequest req) {

        if (isOverlapping(req.getRoomId(), req.getCheckIn(), req.getCheckOut(), -1)) {
            throw new RuntimeException("Selected dates overlap existing bookings.");
        }

        Booking booking = new Booking();
        fillBookingFields(booking, req);

        return bookingRepository.save(booking);
    }

    // ---------------- UPDATE BOOKING ----------------
    public Booking updateBooking(int id, BookingRequest req) {

        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (isOverlapping(req.getRoomId(), req.getCheckIn(), req.getCheckOut(), id)) {
            throw new RuntimeException("Selected dates overlap existing bookings.");
        }

        fillBookingFields(existing, req);
        return bookingRepository.save(existing);
    }

    // ---------------- COMMON FILL FUNCTION ----------------
    private void fillBookingFields(Booking booking, BookingRequest req) {

        BookingStatus status = bookingStatusRepository.findById(req.getBookingStatusId())
                .orElseThrow(() -> new RuntimeException("Invalid booking status ID"));

        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new RuntimeException("Invalid room ID"));

        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("Invalid user ID"));

        booking.setCheckIn(req.getCheckIn());
        booking.setCheckOut(req.getCheckOut());
        booking.setGuestsCount(req.getGuestsCount());
        booking.setTotalPrice(req.getTotalPrice());
        booking.setBookingStatus(status);
        booking.setRoom(room);
        booking.setUser(user);
    }

    // ---------------- OVERLAP CHECK ----------------
    private boolean isOverlapping(int roomId, LocalDate start, LocalDate end, int bookingIdToIgnore) {

        List<Booking> existing = bookingRepository.findByRoomId(roomId);

        for (Booking b : existing) {

            if (b.getId() == bookingIdToIgnore) continue;

            if (!(end.isBefore(b.getCheckIn()) || start.isAfter(b.getCheckOut().minusDays(1)))) {
                return true;
            }
        }
        return false;
    }

    // ---------------- GET BOOKED DATES ----------------
    public List<LocalDate> getBookedDates(int roomId) {
        List<Booking> bookings = bookingRepository.findByRoomId(roomId);
        List<LocalDate> bookedDates = new ArrayList<>();

        for (Booking b : bookings) {
            LocalDate start = b.getCheckIn();
            LocalDate end = b.getCheckOut().minusDays(1);

            while (!start.isAfter(end)) {
                bookedDates.add(start);
                start = start.plusDays(1);
            }
        }
        return bookedDates;
    }

    public Booking getBookingById(int id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public List<Booking> getBookingsByUser(int userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }
}
