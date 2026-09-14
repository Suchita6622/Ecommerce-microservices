
package com.ecommerce.userservice.dto;

public class LoginResponse {

    private String email;
    private String message;
    private String token;

    public LoginResponse(String email, String message, String token) {
        this.email = email;
        this.message = message;
        this.token= token;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

}