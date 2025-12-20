package kj002.tripplaner.dtos;

import lombok.Data;
import java.time.Instant;

@Data
public class ReviewDTO {
    private Long id;
    private int rating;
    private String comment;
    private String adminReply;

    private Instant createdAt;
    private Instant updatedAt;

    private Long userId;
    private String userName;
    private Long productId;
    private Long orderId;
}
