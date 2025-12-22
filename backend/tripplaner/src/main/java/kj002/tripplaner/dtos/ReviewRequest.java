package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class ReviewRequest {
    private int rating;
    private String comment;
}
