package com.hotel.booking.service;

import com.hotel.booking.dto.RegisterRequest;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String register(RegisterRequest req) {

        Optional<User> existingUser = userRepository.findByEmail(req.getEmail());
        if (existingUser.isPresent()) {
            return "Email already in use";
        }

        User user = new User();
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmail(req.getEmail());
        user.setMobile(req.getMobile());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        userRepository.save(user);

        return "success";
    }

    public String login(String email, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "Email or password wrong";
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return "Email or password wrong";
        }

        return "Login successful";
    }
}
