
package com.ecommerce.userservice.service;

import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ecommerce.userservice.dto.LoginResponse;
import com.ecommerce.userservice.security.JwtService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    public User registerUser(User user) {

        String hashedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElse(null);
    }
    public boolean checkPassword(String rawPassword, String encodedPassword) {

        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    public LoginResponse loginUser(String email, String password) {

        User user = findByEmail(email);

        if (user == null) {
            return new LoginResponse(email, "User not found", null);
        }

        if (!checkPassword(password, user.getPassword())) {
            return new LoginResponse(email, "Invalid password", null);
        }

        String token = jwtService.generateToken(email);

        return new LoginResponse(email, "Login successful", token);
    }

}
