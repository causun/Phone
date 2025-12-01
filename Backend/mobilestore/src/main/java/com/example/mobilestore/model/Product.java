package com.example.mobilestore.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private Category category;

    private String mainImage;

    @ElementCollection
    private List<String> subImages;

    private double price;
    private int stock;
    private boolean active = true;
}
