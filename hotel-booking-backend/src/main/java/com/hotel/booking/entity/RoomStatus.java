package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "status", length = 45, nullable = false)
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
