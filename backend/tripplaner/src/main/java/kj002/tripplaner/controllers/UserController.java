package kj002.tripplaner.controllers;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kj002.tripplaner.dtos.ChangePass;
import kj002.tripplaner.dtos.UserLogin;
import kj002.tripplaner.dtos.UserUpdate;
import kj002.tripplaner.dtos.VerifyOtpRequest;
import kj002.tripplaner.models.User;
import kj002.tripplaner.repositories.UserReposiroty;
import kj002.tripplaner.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final AuthenticationService authService;
    private UserReposiroty userReposiroty;

    public UserController(AuthenticationService authService, UserReposiroty userReposiroty) {
        this.authService = authService;
        this.userReposiroty = userReposiroty;
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            Optional<User> userExisting = userReposiroty.findByEmail(email);
            if (userExisting.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("user not found");
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(userExisting.get());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User request
    ) {
        try {
            authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            if (e.getMessage().equals("EXISTINGEMAIL")) {
                return ResponseEntity
                        .status(409) // HTTP 409 Conflict
                        .body("Người dùng đã tồn tại");
            }
            return ResponseEntity
                    .status(500)
                    .body("Lỗi khi đăng ký: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest verifyOtpRequest) {
        try {
            boolean isValid = authService.verifyOtpRegister(verifyOtpRequest.getEmail(), verifyOtpRequest.getOtpCode());
            if (isValid) {
                return ResponseEntity.ok("OTP xác thực thành công.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("OTP không hợp lệ hoặc đã hết hạn.");
            }
        } catch (Exception e) {

            return ResponseEntity
                    .status(500)
                    .body("Lỗi verify email: " + e.getMessage());
        }
    }

    @PostMapping("/send-reset-otp")
    public ResponseEntity<String> sendResetOtp(@RequestBody VerifyOtpRequest verifyOtpRequest) {
        try {
            boolean isValid = authService.sendOTPReset(verifyOtpRequest);
            if (isValid) {
                return ResponseEntity.ok("Đã send OTP reset thành công.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("opp something went wrong.");
            }
        } catch (Exception e) {
            if (e.getMessage().equals("INVALIDACCOUNT")) {
                return ResponseEntity
                        .status(409) // HTTP 409 Conflict
                        .body("tài khoản không tồn tại");
            }
            return ResponseEntity
                    .status(500)
                    .body("Lỗi verify email: " + e.getMessage());
        }
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<String> verifyResetOtp(@RequestBody VerifyOtpRequest verifyOtpRequest) {
        try {
            boolean isValid = authService.verifyOtpReset(verifyOtpRequest.getEmail(), verifyOtpRequest.getOtpCode());
            if (isValid) {
                return ResponseEntity.ok("verify OTP reset thành công.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("opp something went wrong.");
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Lỗi verify email: " + e.getMessage());
        }
    }



    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return authService.refreshToken(request, response);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER','USER')")
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePass changePass) {
        try {
            boolean result = authService.changePassword(changePass);
            return ResponseEntity.ok("Password changed successfully!");
        } catch (IllegalArgumentException e) {
            // Lỗi nghiệp vụ do mình ném ra, trả về 400
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "status", 400
            ));
        } catch (Exception e) {
            // Lỗi không lường trước -> trả về 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "Something went wrong",
                    "details", e.getMessage(),
                    "status", 500
            ));
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER','USER')")
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @ModelAttribute UserUpdate userUpdate) {
        try {
            authService.updateProfile(userUpdate);
            return ResponseEntity.ok("Profile updated successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while processing avatar file!");
        }
    }
}
