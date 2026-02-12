package com.hotel.booking.controller;

import com.hotel.booking.dto.RoomResponse;
import com.hotel.booking.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5174") // Ensure CORS at controller level
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<RoomResponse> listRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public RoomResponse getRoom(@PathVariable int id) {
        return roomService.getRoomById(id);
    }
}
