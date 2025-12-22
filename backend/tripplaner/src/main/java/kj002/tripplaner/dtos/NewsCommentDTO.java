package kj002.tripplaner.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NewsCommentDTO {
    private Long id;
    private Long newsId;
    private Long userId;
    private String fullName;
    private String email;
    private String avatar;
    private String content;
    private LocalDateTime createdAt;
    private Long parentId;
}
