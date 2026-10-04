package com.ecommerce.userservice.controller;

import com.ecommerce.userservice.dto.LoginRequest;
import com.ecommerce.userservice.dto.LoginResponse;
import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        try {
            User registeredUser = userService.registerUser(user);

            return ResponseEntity.ok(registeredUser);

        } catch (RuntimeException e) {

            if ("User already exists".equals(e.getMessage())) {
                return ResponseEntity
                        .status(409)
                        .body(new LoginResponse(null, "User already exists. Please login instead.", null));
            }

            return ResponseEntity
                    .status(500)
                    .body(new LoginResponse(null, "Registration failed", null));
        }
    }

    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {

        String email = authentication.getName();

        return userService.findByEmail(email);
    }

    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            user.setPassword(null); // Never expose password hash
        }
        return user;
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody(required = false) LoginRequest body,
                                   @RequestParam(required = false) String email,
                                   @RequestParam(required = false) String password) {
        String reqEmail = body != null && body.getEmail() != null ? body.getEmail() : email;
        String reqPassword = body != null && body.getPassword() != null ? body.getPassword() : password;

        if (reqEmail == null || reqPassword == null) {
            return new LoginResponse(null, "Email and password are required", null);
        }

        return userService.loginUser(reqEmail, reqPassword);
    }
}