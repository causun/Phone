package kj002.tripplaner.services;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import kj002.tripplaner.models.User;
import kj002.tripplaner.repositories.TokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

// Đánh dấu class này là một Spring service component
@Service
public class JwtService {
    // Sử dụng @Value để lấy các giá trị cấu hình từ
    // application.properties hoặc application.yml
    @Value("${application.security.jwt.secret-key}")
    private String secretKey; // Khóa bí mật dùng để ký JWT
    @Value("${application.security.jwt.access-token-expiration}")
    private long accessTokenExpire; // Thời gian hết hạn của Access Token
    @Value("${application.security.jwt.refresh-token-expiration}")
    private long refreshTokenExpire; // Thời gian hết hạn của Refresh Token
    // Inject TokenRepository để quản lý và truy vấn các token đã được cấp
    private final kj002.tripplaner.repositories.TokenRepository tokenRepository;
    // Constructor injection cho TokenRepository
    public JwtService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    // Phương thức để trích xuất username từ JWT token
    public String extractUsername(String token) {
        // Trích xuất "subject" từ claims của token
        return extractClaim(token, Claims::getSubject);
    }
    // Phương thức để kiểm tra xem token có hợp lệ hay không
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token); // Lấy username từ token
        // Kiểm tra trong cơ sở dữ liệu xem token này đã bị đăng xuất hay chưa
        boolean validToken = tokenRepository
                .findByAccessToken(token)
                .map(t -> !t.isLogOut()) // Token vẫn hợp lệ nếu chưa bị đăng xuất
                .orElse(false);

        // Token hợp lệ nếu username khớp, chưa hết hạn, và chưa bị đăng xuất
        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validToken;
    }
    // Phương thức kiểm tra tính hợp lệ của Refresh Token
    public boolean isValidRefreshToken(String token, User user) {
        String username = extractUsername(token); // Lấy username từ token

        // Kiểm tra tính hợp lệ của Refresh Token trong cơ sở dữ liệu
        boolean validRefreshToken = tokenRepository
                .findByRefreshToken(token)
                .map(t -> !t.isLogOut())
                .orElse(false);

        // Refresh Token hợp lệ nếu username khớp, chưa hết hạn, và token chưa bị đăng xuất
        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validRefreshToken;
    }
    // Phương thức kiểm tra xem token có hết hạn hay chưa
    private boolean isTokenExpired(String token) {
        // Kiểm tra nếu ngày hết hạn trước ngày hiện tại
        return extractExpiration(token).before(new Date());
    }
    // Phương thức trích xuất ngày hết hạn từ token
    private Date extractExpiration(String token) {
        // Lấy thông tin expiration từ claims của token
        return extractClaim(token, Claims::getExpiration);
    }
    // Phương thức trích xuất một claim bất kỳ từ token
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token); // Trích xuất toàn bộ claims từ token
        return resolver.apply(claims); // Áp dụng hàm resolver để lấy claim mong muốn
    }
    // Phương thức trích xuất toàn bộ claims từ token
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser() // Khởi tạo bộ parser cho JWT
                .verifyWith(getSigninKey()) // Xác thực token bằng khóa bí mật
                .build()
                .parseSignedClaims(token) // Parse token và trích xuất claims
                .getPayload(); // Lấy payload (claims)
    }
    // Phương thức tạo Access Token cho người dùng
    public String generateAccessToken(User user) {
        // Tạo Access Token với thời gian hết hạn
        return generateToken(user, accessTokenExpire);
    }
    // Phương thức tạo Refresh Token cho người dùng
    public String generateRefreshToken(User user) {
        // Tạo Refresh Token với thời gian hết hạn
        return generateToken(user, refreshTokenExpire);
    }
    // Phương thức tạo token với thời gian hết hạn được truyền vào
    private String generateToken(User user, long expireTime) {
        return Jwts
                .builder()
                .subject(user.getEmail()) // dùng email
                .claim("role", user.getRole())
                .claim("authorities", new String[]{user.getRole().name()}) // <--- ADD THIS
                .claim("fullName", user.getFullName())
                .claim("phone", user.getPhone())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigninKey())
                .compact();
    }

    // Phương thức lấy khóa bí mật để ký JWT
    private SecretKey getSigninKey() {
        // Giải mã khóa bí mật từ chuỗi base64url
        byte[] keyBytes = Decoders.BASE64URL.decode(secretKey);
        // Trả về khóa bí mật dưới dạng SecretKey cho HMAC
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
