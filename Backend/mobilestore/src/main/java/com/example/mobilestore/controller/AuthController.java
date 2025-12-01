package com.example.mobilestore.controller;

import com.example.mobilestore.dto.UserDTO.*;
import com.example.mobilestore.dto.ApiResponse;
import com.example.mobilestore.model.User;
import com.example.mobilestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * Đăng ký User mới
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody RegisterRequest request){
        User u = new User();
        u.setName(request.getName());
        u.setEmail(request.getEmail());
        u.setPassword(request.getPassword()); // UserService sẽ encode password
        u.setPhone(request.getPhone());
        u.setBirthday(request.getBirthday());
        u.setRole("USER"); // mặc định role USER

        User saved = userService.register(u);
        return ResponseEntity.ok(ApiResponse.success(saved));
    }

    /**
     * Login User
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody LoginRequest request){
        return userService.login(request.getEmail(), request.getPassword())
                .map(user -> ResponseEntity.ok(ApiResponse.success(user)))
                .orElse(ResponseEntity.ok(ApiResponse.fail("Email hoặc mật khẩu không chính xác")));
    }
}
