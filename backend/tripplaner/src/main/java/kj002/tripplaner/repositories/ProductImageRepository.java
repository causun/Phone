package kj002.tripplaner.repositories;

import kj002.tripplaner.models.Product;
import kj002.tripplaner.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
    List<ProductImage> findByProduct(Product product);
}
