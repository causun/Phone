package kj002.tripplaner.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsDTO {

    @Data
    public static class NewsResponse {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private String author;
        private int likes;
        private int comments;
        private int views;
    }
}
