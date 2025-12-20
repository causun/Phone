package kj002.tripplaner.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import kj002.tripplaner.dtos.ChangePass;
import kj002.tripplaner.dtos.UserLogin;
import kj002.tripplaner.dtos.UserUpdate;
import kj002.tripplaner.dtos.VerifyOtpRequest;
import kj002.tripplaner.models.*;
import kj002.tripplaner.repositories.OTPRepository;
import kj002.tripplaner.repositories.TokenRepository;
import kj002.tripplaner.repositories.UserReposiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {
    private String subFolder = "userImages";
    // Khai báo các dependency cần thiết
    private final UserReposiroty repository;
    private final PasswordEncoder passwordEncoder; // Để mã hóa mật khẩu người dùng
    private final JwtService jwtService; // Để tạo và xác thực JWT tokens
    private final TokenRepository tokenRepository; // Repository để quản lý token
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    private OTPRepository otpReposiroty;

    // Spring Security để xác thực người dùng
    private final AuthenticationManager authenticationManager;
    // Constructor injection cho các dependency
    public AuthenticationService(UserReposiroty repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public boolean register(User request) {
        // Kiểm tra email đã tồn tại chưa
        Optional<User> userExisting = repository.findByEmail(request.getEmail());
        if (userExisting.isPresent()) {
            if(userExisting.get().isStatus() == true){
                throw new RuntimeException("EXISTINGEMAIL");
            }
        }
        try {
            // 1. Tạo user
            var user = User.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .status(false)
                    .gender(request.getGender())
                    .phone(request.getPhone())
                    .address(request.getAddress())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            var savedUser = repository.save(user);
            // 2. Tạo OTP (hết hạn sau 10 phút)
            String otpCode = generateOtp();
            var otp = Otp.builder()
                    .code(otpCode)
                    .createdTime(LocalDateTime.now())
                    .expiryDate(LocalDateTime.now().plusMinutes(10))
                    .status(false)
                    .otpType(OtpType.REGISTER)
                    .user(savedUser)
                    .email(request.getEmail())
                    .build();
            otpReposiroty.save(otp);
           // 3. Gửi email
            String subject = "Xác nhận đăng ký - Mã OTP của bạn";
            String content =
                    "Mã OTP của bạn là " + otpCode +
                            ". Vui lòng không chia sẻ với bất kỳ ai. " +
                            "Mã sẽ hết hạn sau 10 phút.";
            sendOtpEmail(request.getEmail(),subject,content);
            return true;
        } catch (Exception ex) {
            // Nếu bất kỳ lỗi nào xảy ra thì rollback transaction
            throw new RuntimeException("Register failed: " + ex.getMessage(), ex);
        }
    }
    public boolean sendOTPReset(@RequestBody VerifyOtpRequest request){
        Optional<User> userExisting = repository.findByEmail(request.getEmail());
        if (userExisting.isPresent()) {
            if(userExisting.get().isStatus() == false){
                throw new RuntimeException("INVALIDACCOUNT");
            }
        }
        try {
            // 2. Tạo OTP (hết hạn sau 10 phút)
            String otpCode = generateOtp();
            var otp = Otp.builder()
                    .code(otpCode)
                    .createdTime(LocalDateTime.now())
                    .expiryDate(LocalDateTime.now().plusMinutes(10))
                    .status(false)
                    .otpType(OtpType.RESET)
                    .user(userExisting.get())
                    .email(request.getEmail())
                    .build();
            otpReposiroty.save(otp);
            // 3. Gửi email
            //"Xác nhận đăng ký - Mã OTP của bạn"
            String subject = "Xác nhận reset password - Mã OTP của bạn";
            String content =
                    "Mã OTP của bạn là " + otpCode +
                            ". Vui lòng không chia sẻ với bất kỳ ai. " +
                            "Mã sẽ hết hạn sau 10 phút.";
            sendOtpEmail(request.getEmail(),subject,content);
        } catch (Exception ex) {
            throw new RuntimeException("reset failed: " + ex.getMessage(), ex);
        }
        return true;
    }
    private void sendOtpEmail(String to,String subject,String content) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom(sender);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content,false);
        mailSender.send(mimeMessage);
    }
    private String generateOtp() {
        int otp = new SecureRandom().nextInt(1_000_000);
        return String.format("%06d", otp);
    }

    public boolean verifyOtpRegister(String email, String otpCode) {
        // Lấy OTP từ DB dựa theo email
        Optional<Otp> otpEntityOpt = otpReposiroty.findByEmailAndOtpType(email,OtpType.REGISTER,otpCode);
        if (otpEntityOpt.isEmpty()) {
            return false;
        }
        Otp otpEntity = otpEntityOpt.get();
        // Kiểm tra mã OTP có khớp không
        if (!otpEntity.getCode().equals(otpCode)) {
            return false;
        }
        // Kiểm tra thời hạn hết hạn
        if (otpEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
           return false;
        }
        if(otpEntity.isStatus()){
            return false;
        }

        otpEntity.setStatus(true);
        otpReposiroty.save(otpEntity);
        //change status cho user để thông báo xác thực otp đăng ký
        //thanh công
        Optional<User> userExisting = repository.findByEmail(email);
        userExisting.get().setStatus(true);
        repository.save(userExisting.get());
        return true; // OTP hợp lệ
    }
    @Transactional
    public boolean verifyOtpReset(String email, String otpCode) throws MessagingException {
        // Lấy OTP từ DB
        Optional<Otp> otpEntityOpt = otpReposiroty.findByEmailAndOtpType(email, OtpType.RESET, otpCode);
        if (otpEntityOpt.isEmpty()) {
            return false; // Không tồn tại OTP
        }
        Otp otpEntity = otpEntityOpt.get();
        // Kiểm tra hạn sử dụng
        if (otpEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
            return false;
        }
        // Kiểm tra trạng thái (đã dùng rồi thì không hợp lệ)
        if (otpEntity.isStatus()) {
            return false;
        }
        // Xóa các OTP cũ, chỉ giữ lại OTP này
        otpReposiroty.deleteOldOtps(email, OtpType.RESET, otpCode);
        // Đánh dấu OTP đã dùng
        otpEntity.setStatus(true);
        otpReposiroty.save(otpEntity);
        // Tìm user để cập nhật mật khẩu
        Optional<User> userExisting = repository.findByEmail(email);
        if (userExisting.isEmpty()) {
            return false; // Không tồn tại user tương ứng
        }
        User user = userExisting.get();
        String newPassword = generatePasswordFromUUID();
        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
        // Gửi email mật khẩu mới
        String subject = "Mật khẩu mới";
        String content = "Password mới của bạn là " + newPassword +
                ". Vui lòng không chia sẻ với bất kỳ ai.";
        sendOtpEmail(email, subject, content);
        return true; // OTP hợp lệ
    }

    public static String generatePasswordFromUUID() {
        return java.util.UUID.randomUUID().toString()
                .replaceAll("-", "")
                .substring(0, 8);
    }
    // Phương thức để xác thực người dùng đã tồn tại
    public AuthenticationResponse authenticate(UserLogin request) {
        // Sử dụng AuthenticationManager để xác thực người dùng
        // dựa trên username và password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        System.out.println("request.getUsername(): "+ request.getEmail());
        // Tìm người dùng theo email từ cơ sở dữ liệu, nếu không tìm thấy thì throw exception
        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        // Tạo Access Token và Refresh Token mới cho người dùng
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        // Hủy tất cả các token cũ của người dùng (nếu có)
        revokeAllTokenByUser(user);
        // Lưu lại token mới cho người dùng
        saveUserToken(accessToken, refreshToken, user);
        // Trả về phản hồi xác thực thành công với các token mới
        return new AuthenticationResponse(accessToken, refreshToken,
                "User login was successful");
    }
    // Phương thức để hủy tất cả các token hợp lệ của người dùng
    private void revokeAllTokenByUser(User user) {
        // Lấy tất cả các token hợp lệ của người dùng
        List<Token> validTokens = tokenRepository.findAccessTokenByUser(user.getId());
        if(validTokens.isEmpty()) {
            return; // Nếu không có token hợp lệ thì kết thúc
        }
        // Đánh dấu tất cả các token là đã đăng xuất
        validTokens.forEach(t-> {
            t.setLogOut(true);
        });

        // Lưu lại các token đã cập nhật
        tokenRepository.saveAll(validTokens);
    }

    // Phương thức để lưu thông tin token của người dùng
    private void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = new Token(); // Tạo đối tượng Token mới
        token.setAccessToken(accessToken); // Thiết lập Access Token
        token.setRefreshToken(refreshToken); // Thiết lập Refresh Token
        token.setLogOut(false); // Đặt trạng thái là chưa đăng xuất
        token.setUser(user); // Gán người dùng cho token
        tokenRepository.save(token); // Lưu token vào cơ sở dữ liệu
    }

    // Phương thức để refresh token của người dùng
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        // Lấy token từ header Authorization
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        // Kiểm tra nếu header không hợp lệ
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Trả về mã lỗi không được phép
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        // Tách token ra từ chuỗi Bearer
        String token = authHeader.substring(7);
        // Lấy email từ token
        String email = jwtService.extractUsername(token);
        // Tìm người dùng theo email
        User user = repository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("No user found"));
        // Kiểm tra tính hợp lệ của Refresh Token
        if(jwtService.isValidRefreshToken(token, user)) {
            // Nếu hợp lệ thì tạo Access Token mới và Refresh Token mới
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            // Hủy tất cả các token cũ và lưu lại token mới
            revokeAllTokenByUser(user);
            saveUserToken(accessToken, refreshToken, user);

            // Trả về phản hồi với các token mới
            return new ResponseEntity(new AuthenticationResponse
                    (accessToken, refreshToken,
                            "New token generated"), HttpStatus.OK);
        }
        // Nếu token không hợp lệ thì trả về mã lỗi không được phép
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    @Transactional
    public boolean changePassword(ChangePass changePass) {
        User user = repository.findByEmail(changePass.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("user is not found"));
        // Kiểm tra confirm password
        if (!changePass.getNewPassword().equals(changePass.getConfirmPassword())) {
            throw new IllegalArgumentException("confirm passs don't match");
        }
        // Kiểm tra old password (dùng passwordEncoder)
        if (!passwordEncoder.matches(changePass.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("old password không đúng");
        }
        // Không cho trùng password cũ
        if (passwordEncoder.matches(changePass.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("new password doesn't duplicate old password ");
        }
        // Lưu mật khẩu mới
        user.setPassword(passwordEncoder.encode(changePass.getNewPassword()));
        repository.save(user);
        return true;
    }
    @Transactional
    public void updateProfile(UserUpdate userUpdate) throws IOException {
        User userExisting = repository.findByEmail(userUpdate.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("user is not found"));
        String imageUrlExisting = userExisting.getAvatar();
        if (userUpdate.getFile() != null && userUpdate.getFile().getSize() > 0) {
            String imageUrlSaved = UploadService.storeImage(subFolder, userUpdate.getFile());
            if (imageUrlExisting != null) {
                // http://localhost:8080\\uploads\\userImages\\cat1.jpg
                UploadService.deleteImage(imageUrlExisting
                        .substring(UploadService.rootUrl.length()));
            }
            userExisting.setAvatar(imageUrlSaved);
        } else {
            userExisting.setAvatar(imageUrlExisting);
        }
        userExisting.setFullName(userUpdate.getFullName());
        userExisting.setAddress(userUpdate.getAddress());
        userExisting.setPhone(userUpdate.getPhone());
        userExisting.setGender(userUpdate.getGender());
        repository.save(userExisting);
    }
    public Map<String, Object> authenticateAdmin(UserLogin request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception ex) {
            // Sai email hoặc password
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS");
        }

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "USER_NOT_FOUND")
                );

        if (user.getRole() != Role.ADMIN) {
            // Không phải admin
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "INVALID_ROLE");
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(accessToken, refreshToken, user);

        Map<String, Object> response = new HashMap<>();
        response.put("access_token", accessToken);
        response.put("refresh_token", refreshToken);
        response.put("message", "Admin login successful");

        return response;
    }
    public User getUserByEmail(String email) {
        return repository.findByEmail(email).orElseThrow();
    }


}
