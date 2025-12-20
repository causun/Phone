package com.example.mobilestore.controller;

import com.example.mobilestore.dto.ApiResponse;
import com.example.mobilestore.dto.UserDTO;
import com.example.mobilestore.model.User;
import com.example.mobilestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    /* ================= REGISTER ================= */
    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ApiResponse<?> register(
            @RequestPart("data") UserDTO.RegisterRequest req,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar
    ) {
        try {
            if (userService.existsByEmail(req.getEmail())) {
                return ApiResponse.fail("Email đã tồn tại");
            }

            userService.register(req, avatar);
            return ApiResponse.success("Register thành công");
        } catch (Exception e) {
            return ApiResponse.fail("Đăng ký thất bại: " + e.getMessage());
        }
    }

    /* ================= VERIFY OTP ================= */
    @PostMapping("/verify-otp")
    public ApiResponse<?> verifyOtp(@RequestBody UserDTO.VerifyOtpRequest req) {
        boolean ok = userService.verifyOtp(req.getEmail(), req.getOtp());
        return ok
                ? ApiResponse.success("Account activated")
                : ApiResponse.fail("OTP không hợp lệ hoặc đã hết hạn");
    }

    /* ================= RESEND OTP ================= */
    @PostMapping("/resend-otp")
    public ApiResponse<?> resendOtp(@RequestBody UserDTO.VerifyOtpRequest req) {
        try {
            // Tận dụng logic có sẵn trong UserService
            userService.sendForgotOtp(req.getEmail());
            return ApiResponse.success("OTP mới đã được gửi");
        } catch (Exception e) {
            return ApiResponse.fail("Không thể gửi lại mã: " + e.getMessage());
        }
    }

    /* ================= LOGIN ================= */
    @PostMapping("/login")
    public ApiResponse<User> login(@RequestBody UserDTO.LoginRequest req) {
        return userService.login(req.getEmail(), req.getPassword())
                .map(ApiResponse::success)
                .orElse(ApiResponse.fail("Email hoặc mật khẩu không đúng"));
    }

    /* ================= FORGOT PASSWORD ================= */
    @PostMapping("/forgot-password/send-otp")
    public ApiResponse<?> sendForgotOtp(@RequestBody UserDTO.ForgotPasswordRequest req) {
        userService.sendForgotOtp(req.getEmail());
        return ApiResponse.success("OTP đã được gửi");
    }

    @PostMapping("/forgot-password/reset")
    public ApiResponse<?> resetPassword(@RequestBody UserDTO.ResetPasswordRequest req) {
        boolean ok = userService.resetPassword(
                req.getEmail(),
                req.getOtp(),
                req.getNewPassword()
        );
        return ok
                ? ApiResponse.success("Đặt lại mật khẩu thành công")
                : ApiResponse.fail("OTP không hợp lệ hoặc đã hết hạn");
    }

    /* ================= UPDATE PROFILE ================= */
    @PutMapping(value = "/user/{id}/update", consumes = "multipart/form-data")
    public ApiResponse<User> updateProfile(
            @PathVariable Long id,
            @RequestPart("name") String name,
            @RequestPart("phone") String phone,
            @RequestPart("birthday") String birthday, // Nhận String rồi parse
            @RequestPart("address") String address,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar
    ) {
        try {
            java.time.LocalDate birthDate = java.time.LocalDate.parse(birthday);
            User updatedUser = userService.updateUser(id, name, phone, birthDate, address, avatar);
            return ApiResponse.success(updatedUser);
        } catch (Exception e) {
            return ApiResponse.fail("Cập nhật thất bại: " + e.getMessage());
        }
    }
}
