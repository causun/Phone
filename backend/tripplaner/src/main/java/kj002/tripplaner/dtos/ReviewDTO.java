package kj002.tripplaner.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.Instant;

@Data
public class ReviewDTO {
    private Long id;
    private int rating;
    private String comment;
    private String adminReply;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
    private Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "UTC")
    private Instant updatedAt;

    private Long userId;
    private String userName;
    private String userAvatar;
    private Long productId;
    private Long orderId;
}
