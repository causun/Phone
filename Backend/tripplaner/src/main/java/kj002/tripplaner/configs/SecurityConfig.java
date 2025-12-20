package kj002.tripplaner.configs;


import kj002.tripplaner.filters.JwtAuthenticationFilter;
import kj002.tripplaner.services.UserDetailsServiceImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// Đánh dấu class này là một cấu hình của Spring
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
// Kích hoạt tính năng bảo mật web của Spring Security
@EnableWebSecurity
public class SecurityConfig {
    // Inject dependency của UserDetailsServiceImp
    // để quản lý thông tin người dùng
    private final UserDetailsServiceImp userDetailsServiceImp;
    // Inject JwtAuthenticationFilter để xử lý xác thực JWT
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    // Inject CustomLogoutHandler để xử lý logout tùy chỉnh
    private final CustomLogoutHandler logoutHandler;

    // Constructor injection cho các dependency
    public SecurityConfig(UserDetailsServiceImp userDetailsServiceImp,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomLogoutHandler logoutHandler) {
        this.userDetailsServiceImp = userDetailsServiceImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.logoutHandler = logoutHandler;
    }

    // Định nghĩa bean SecurityFilterChain để cấu hình bảo mật
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Vô hiệu hóa CSRF (Cross-Site Request Forgery)
                .csrf(AbstractHttpConfigurer::disable)
                // Cấu hình các yêu cầu HTTP
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/uploads/**",
                                "/uploads/productImages/**",
                                "/images/**"
                        ).permitAll()

                        // public
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers("/api/brands/**").permitAll()
                        .requestMatchers("/api/news/**").permitAll()

                        // user endpoints -> phải đăng nhập
                        .requestMatchers("/api/orders/my").authenticated()
                        .requestMatchers("/api/reviews/me").authenticated()
                        .requestMatchers("/api/compare/**").permitAll()
                        .requestMatchers("/api/admin/revenue/**").permitAll()

                        // public read-only
                        .requestMatchers("/api/reviews/product/**").permitAll()

                        // admin only
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")

                        .anyRequest().authenticated()
                )


                // Cung cấp dịch vụ UserDetailsService tùy chỉnh
                .userDetailsService(userDetailsServiceImp)
                // Cấu hình quản lý phiên làm việc
                .sessionManagement(session -> session
                        // Thiết lập chính sách tạo phiên làm việc là STATELESS (không lưu trạng thái)
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Thêm bộ lọc JWT trước UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // Cấu hình xử lý ngoại lệ
                .exceptionHandling(
                        e -> e.accessDeniedHandler(
                                        (request, response, accessDeniedException) -> response.setStatus(403) // Trả về mã 403 khi truy cập bị từ chối
                                )
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)) // Trả về mã 401 khi chưa xác thực
                )
                // Cấu hình logout
                .logout(l -> l
                        .logoutUrl("/api/logout") // Định nghĩa URL logout
                        .addLogoutHandler(logoutHandler) // Thêm handler xử lý logout tùy chỉnh
                        .logoutSuccessHandler((request, response, authentication)
                                // Xóa thông tin bảo mật sau khi logout
                                -> SecurityContextHolder.clearContext())
                )
                // Xây dựng cấu hình và trả về
                .build();
    }

    // Định nghĩa bean PasswordEncoder để mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Sử dụng BCrypt để mã hóa mật khẩu
    }

    // Định nghĩa bean AuthenticationManager để quản lý xác thực
    @Bean
    public AuthenticationManager authenticationManager
    (AuthenticationConfiguration configuration) throws Exception {
        // Lấy AuthenticationManager từ cấu hình hiện tại
        return configuration.getAuthenticationManager();
    }

    // Định nghĩa phương thức corsConfigurationSource để cấu hình CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept"
        ));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
