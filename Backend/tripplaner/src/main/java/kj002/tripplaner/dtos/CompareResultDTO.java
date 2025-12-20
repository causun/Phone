package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class CompareResultDTO {
    private ProductDetailDTO p1;
    private ProductDetailDTO p2;
    private String aiConclusion;
}
