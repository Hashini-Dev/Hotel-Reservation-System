package com.hotel.booking.dto;

import java.util.List;

public class RoomResponse {
    private int id;
    private String name;
    private String description;
    private String type;
    private int capacity;
    private double price;
    private String status;
    private List<String> images;

    private boolean availableToday; // NEW FIELD

    public RoomResponse() {}

    public RoomResponse(int id, String name, String description, String type, int capacity,
                        double price, String status, List<String> images, boolean availableToday) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.status = status;
        this.images = images;
        this.availableToday = availableToday;
    }

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public boolean isAvailableToday() { return availableToday; }
    public void setAvailableToday(boolean availableToday) { this.availableToday = availableToday; }
}
