package com.example.mobilestore.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private String description;
    private boolean active;
    private int productCount; // số lượng sản phẩm
}
