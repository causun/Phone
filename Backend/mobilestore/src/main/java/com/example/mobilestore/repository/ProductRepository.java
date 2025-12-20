package com.example.mobilestore.repository;

import com.example.mobilestore.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsBySku(String sku);

    /* USER chỉ thấy OPEN */
    @Query("""
    SELECT p FROM Product p
    WHERE
        (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
        AND (:categoryId IS NULL OR p.category.id = :categoryId)
        AND p.status = com.example.mobilestore.model.ProductStatus.OPEN
""")
    List<Product> searchProducts(
            @Param("name") String name,
            @Param("categoryId") Long categoryId
    );

    /* ADMIN */
    @Query("""
    SELECT p FROM Product p
    WHERE
        (:keyword IS NULL
            OR LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
""")
    Page<Product> searchAdmin(@Param("keyword") String keyword, Pageable pageable);
}
