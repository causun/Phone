package com.example.mobilestore.service;

import com.example.mobilestore.dto.UserDTO;
import com.example.mobilestore.model.User;
import com.example.mobilestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    private final String UPLOAD_DIR = "C:/Aptech/Mobile/Backend/mobilestore/uploads/avatars/";

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JavaMailSender mailSender;

    /* ================= COMMON ================= */
    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    public boolean existsByEmail(String email) {
        return repo.findByEmail(normalizeEmail(email)).isPresent();
    }

    /* ================= REGISTER ================= */
    public void register(UserDTO.RegisterRequest req, MultipartFile avatar) throws Exception {

        User user = new User();
        String email = normalizeEmail(req.getEmail());

        user.setName(req.getName());
        user.setEmail(email);
        user.setPassword(encoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setBirthday(req.getBirthday());
        user.setAddress(req.getAddress());
        user.setRole("USER");
        user.setStatus(0); // tài khaorn chưa kích hoạt

        // OTP vẫn tạo để dùng cho forgot-password nếu cần
        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));

        repo.save(user); // lưu trước để có ID

        // ✅ LƯU AVATAR giống Product
        if (avatar != null && !avatar.isEmpty()) {
            File folder = new File(UPLOAD_DIR);
            if (!folder.exists()) folder.mkdirs();

            String fileName = user.getId() + "_" + avatar.getOriginalFilename();
            File filePath = new File(UPLOAD_DIR + fileName);
            avatar.transferTo(filePath);
            user.setAvatar(fileName);

            repo.save(user);
        }

        sendOtpAsync(email, otp); // gửi OTP async
    }

    /* ================= VERIFY OTP ================= */
    public boolean verifyOtp(String email, String otp) {

        User user = repo.findByEmail(normalizeEmail(email)).orElse(null);
        if (user == null) return false;

        if (user.getOtpExpiredAt() == null) return false;
        if (user.getOtpExpiredAt().isBefore(LocalDateTime.now())) return false;
        if (!otp.equals(user.getOtp())) return false;

        user.setStatus(1);
        user.setOtp(null);
        user.setOtpExpiredAt(null);
        repo.save(user);

        return true;
    }

    /* ================= AVATAR ================= */
    public void saveAvatar(Long userId, MultipartFile file) throws Exception {
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) folder.mkdirs();

        String fileName = userId + "_" + file.getOriginalFilename();
        File filePath = new File(UPLOAD_DIR + fileName);
        file.transferTo(filePath);

        User user = repo.findById(userId).orElseThrow();
        user.setAvatar(fileName);
        repo.save(user);
    }

    /* ================= LOGIN ================= */
    public Optional<User> login(String email, String password) {
        User user = repo.findByEmail(normalizeEmail(email)).orElse(null);
        if (user == null) return Optional.empty();
        if (user.getStatus() != 1) return Optional.empty();
        if (!encoder.matches(password, user.getPassword())) return Optional.empty();
        return Optional.of(user);
    }

    /* ================= FORGOT PASSWORD ================= */
    public void sendForgotOtp(String email) {
        User user = repo.findByEmail(normalizeEmail(email)).orElseThrow();

        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiredAt(LocalDateTime.now().plusMinutes(5));
        repo.save(user);

        sendOtpAsync(user.getEmail(), otp);
    }

    public boolean resetPassword(String email, String otp, String newPassword) {
        User user = repo.findByEmail(normalizeEmail(email)).orElse(null);
        if (user == null) return false;
        if (!otp.equals(user.getOtp())) return false;
        if (user.getOtpExpiredAt().isBefore(LocalDateTime.now())) return false;

        user.setPassword(encoder.encode(newPassword));
        user.setStatus(1);
        user.setOtp(null);
        user.setOtpExpiredAt(null);
        repo.save(user);

        return true;
    }

    /* ================= ASYNC MAIL ================= */
    @Async
    public void sendOtpAsync(String email, String otp) {
        sendOtpEmail(email, otp);
    }

    private void sendOtpEmail(String to, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("OTP Verification");
        msg.setText("Your OTP is: " + otp + " (valid 5 minutes)");
        mailSender.send(msg);
    }

    /* ================= UTIL ================= */
    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    /* ================= UPDATE PROFILE ================= */
    public User updateUser(Long id, String name, String phone, java.time.LocalDate birthday, String address, MultipartFile avatar) throws Exception {
        User user = repo.findById(id).orElseThrow(() -> new Exception("Không tìm thấy người dùng"));

        // Cập nhật thông tin cơ bản
        user.setName(name);
        user.setPhone(phone);
        user.setBirthday(birthday);
        user.setAddress(address);

        // Xử lý Avatar
        if (avatar != null && !avatar.isEmpty()) {
            // 1. Xóa ảnh cũ nếu tồn tại
            if (user.getAvatar() != null) {
                try {
                    Path oldPath = Paths.get(UPLOAD_DIR + user.getAvatar());
                    Files.deleteIfExists(oldPath);
                } catch (Exception e) {
                    System.err.println("Không thể xóa ảnh cũ: " + e.getMessage());
                }
            }

            // 2. Lưu ảnh mới
            File folder = new File(UPLOAD_DIR);
            if (!folder.exists()) folder.mkdirs();
            String fileName = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
            File filePath = new File(UPLOAD_DIR + fileName);
            avatar.transferTo(filePath);
            user.setAvatar(fileName);
        }
        return repo.save(user);
    }
}
