package com.hotel.booking.service;

import com.hotel.booking.dto.RoomResponse;
import com.hotel.booking.entity.Room;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${server.base-url:http://localhost:8080}")
    private String serverBaseUrl;

    public RoomService(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(this::toRoomResponse)
                .collect(Collectors.toList());
    }

    public RoomResponse getRoomById(int id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return toRoomResponse(room);
    }

    private RoomResponse toRoomResponse(Room room) {

        // Get images
        List<String> imageUrls = findAllImageUrls(room.getId());
        if (imageUrls.isEmpty()) {
            imageUrls.add(serverBaseUrl + "/room-images/" + room.getId() + "/image1.png");
        }

        // Room status
        String status = room.getRoomStatus() != null ? room.getRoomStatus().getStatus() : "Unknown";

        // CHECK IF ROOM IS BOOKED TODAY
        LocalDate today = LocalDate.now();

        boolean isBookedToday = bookingRepository.existsByRoomIdAndCheckOutGreaterThanAndCheckInLessThan(
                room.getId(),
                today, // start of range
                today.plusDays(1) // end of range (exclusive)
        );

        return new RoomResponse(
                room.getId(),
                room.getRoomName(),
                room.getRoomDescription(),
                room.getRoomType() != null ? room.getRoomType().getType() : "Unknown",
                room.getCapacity(),
                room.getPrice(),
                status,
                imageUrls,
                !isBookedToday // availableToday
        );
    }

    private List<String> findAllImageUrls(int roomId) {
        Path roomFolder = Path.of(uploadDir, String.valueOf(roomId));
        if (!Files.exists(roomFolder) || !Files.isDirectory(roomFolder)) {
            return List.of();
        }

        try {
            return Files.list(roomFolder)
                    .filter(Files::isRegularFile)
                    .sorted(Comparator.naturalOrder())
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .map(fileName -> serverBaseUrl + "/room-images/" + roomId + "/" + fileName)
                    .toList();
        } catch (IOException e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
