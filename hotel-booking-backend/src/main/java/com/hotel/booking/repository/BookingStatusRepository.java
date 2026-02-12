package com.hotel.booking.repository;

import com.hotel.booking.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingStatusRepository extends JpaRepository<BookingStatus, Integer> {}


