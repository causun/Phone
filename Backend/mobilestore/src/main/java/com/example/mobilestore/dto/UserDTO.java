package com.example.mobilestore.dto;

import lombok.Data;
import java.time.LocalDate;

public class UserDTO {
    @Data
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String phone;
        private LocalDate birthday;
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class UserResponse {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String avatar;
        private LocalDate birthday;
        private String role;
    }
}
