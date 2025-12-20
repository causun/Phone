package kj002.tripplaner.dtos;


import kj002.tripplaner.models.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateDTO {
    private Long id;
    private Long brandId;
    private String name;
    private double price;
    private int quantityInStock;
    private String screenSize;
    private String ram;
    private String storage;
    private String chipset;
    private String camera;
    private String battery;
    private String os;
    private String color;
    private String description;
    private ProductStatus status;
    private List<MultipartFile> images;
    private List<Long>deleteImagesId;
}
