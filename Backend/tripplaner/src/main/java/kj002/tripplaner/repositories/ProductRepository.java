package kj002.tripplaner.repositories;

import kj002.tripplaner.dtos.ProductDTO;
import kj002.tripplaner.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByBrand_Id(Long brandId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double getAverageRating(@Param("productId") Long productId);

    @Query("select count(r.id) from Review r where r.product.id = :productId")
    Long countReviews(Long productId);

}

