package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.UserLogin;
import kj002.tripplaner.helpers.ApiResponse;
import kj002.tripplaner.models.User;
import kj002.tripplaner.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authService;

    public AuthController(AuthenticationService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin request) {
        try {
            var result = authService.authenticate(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email hoặc mật khẩu không đúng");
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody UserLogin request) {
        try {
            var result = authService.authenticateAdmin(request);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg.contains("INVALID_CREDENTIALS")) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Email hoặc mật khẩu không đúng");
            }
            if (msg.contains("INVALID_ROLE")) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Tài khoản này không phải admin");
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi đăng nhập admin: " + msg);
        }
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails){
        try {
            String email = userDetails.getUsername();
            User user = authService.getUserByEmail(email);

            return ResponseEntity.ok(
                    ApiResponse.success(user, "Get current user")
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi lấy thông tin user: " + e.getMessage());
        }
    }

}
