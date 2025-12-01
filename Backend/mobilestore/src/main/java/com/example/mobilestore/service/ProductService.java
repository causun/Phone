package com.example.mobilestore.service;

import com.example.mobilestore.model.Product;
import com.example.mobilestore.model.Category;
import com.example.mobilestore.repository.ProductRepository;
import com.example.mobilestore.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    // Lấy tất cả sản phẩm active, mới nhất trước (id giảm dần)
    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue(Sort.by(Sort.Direction.DESC, "id"));
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> searchByCategory(Long categoryId){
        Category c = categoryRepository.findById(categoryId).orElse(null);
        return c != null ? productRepository.findByCategory(c) : List.of();
    }

    public Product getById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public Product save(Product p){
        return productRepository.save(p);
    }

    public void delete(Product p){
        productRepository.delete(p);
    }
}
