package kj002.tripplaner.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tokens")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String accessToken;
    @Column(columnDefinition = "TEXT")
    private String refreshToken;
    private boolean logOut;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
