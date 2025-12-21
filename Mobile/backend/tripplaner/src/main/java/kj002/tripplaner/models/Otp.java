package kj002.tripplaner.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "otps")
public class Otp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String email;
    private LocalDateTime expiryDate;
    private LocalDateTime createdTime;
    private boolean status;
    @Enumerated(EnumType.STRING)
    private OtpType otpType;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
