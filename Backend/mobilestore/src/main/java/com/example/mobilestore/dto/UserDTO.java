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
        private String address;
        private String otp; // dùng khi verify
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class VerifyOtpRequest {
        private String email;
        private String otp;
    }

    @Data
    public static class ForgotPasswordRequest {
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        private String email;
        private String otp;
        private String newPassword;
    }
}
