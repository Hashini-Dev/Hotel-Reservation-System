package com.hotel.booking.repository;

import com.hotel.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(int userId);

    List<Booking> findByRoomId(int roomId);

    boolean existsByRoomIdAndCheckOutGreaterThanAndCheckInLessThan(
            int roomId,
            LocalDate startDate,
            LocalDate endDate
    );
}
