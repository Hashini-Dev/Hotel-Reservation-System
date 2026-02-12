package com.hotel.booking.service;

import com.hotel.booking.dto.LoginRequest;
import com.hotel.booking.dto.LoginResponse;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email or password is wrong"));

        boolean match = passwordEncoder.matches(req.getPassword(), user.getPassword());
        if (!match) {
            throw new IllegalArgumentException("Email or password is wrong");
        }

        return new LoginResponse("dummy-token", user.getId()); // return userId
    }
}
