package kj002.tripplaner.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "news_likes",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"news_id", "user_id"})})
@Data
public class NewsLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "news_id")
    private Long newsId;

    @Column(name = "user_id")
    private Long userId;

    private LocalDateTime likedAt = LocalDateTime.now();
}
