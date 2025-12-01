package com.example.mobilestore.dto;

import lombok.Data;
import java.time.LocalDateTime;

public class NewsDTO {

    @Data
    public static class NewsResponse {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private String author; // Người đăng
    }
}
