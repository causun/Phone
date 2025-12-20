package com.example.mobilestore.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;
    private LocalDate birthday;

    private String address;   // ✅ thêm địa chỉ
    private String avatar;

    private String role;      // USER / ADMIN

    private String otp;       // mã OTP 6 số
    private LocalDateTime otpExpiredAt;

    private Integer status;   // 0 = chưa kích hoạt, 1 = kích hoạt
}
