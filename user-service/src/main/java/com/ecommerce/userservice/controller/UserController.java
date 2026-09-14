
package com.ecommerce.userservice.controller;

import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.userservice.dto.LoginResponse;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/profile")
    public String getProfile(Authentication authentication) {
        return "Logged in as: " + authentication.getName();
    }
    @PostMapping("/login")
    public LoginResponse loginUser(@RequestParam String email,
                                   @RequestParam String password) {

        return userService.loginUser(email, password);
    }
}