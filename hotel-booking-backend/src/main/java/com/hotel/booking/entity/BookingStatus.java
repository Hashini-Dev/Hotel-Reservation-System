package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "status", length = 45, nullable = false)
    private String bookingStatus;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}
