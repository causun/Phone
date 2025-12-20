package com.example.mobilestore.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsCommentDTO {
    private Long id;
    private Long newsId;
    private Long userId;
    private String username; // tên người comment
    private String email;    // email người comment
    private String content;
    private LocalDateTime createdAt;
    private Long parentId;
}
