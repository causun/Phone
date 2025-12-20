package com.example.mobilestore.controller;

import com.example.mobilestore.model.Product;
import com.example.mobilestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<Product> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return productService.getProducts(search, categoryId, page, size);
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @PostMapping("/create")
    public Product create(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return productService.create(product, image);
    }

    @PutMapping("/update/{id}")
    public Product update(
            @PathVariable Long id,
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return productService.update(id, product, image);
    }

    @PatchMapping("/{id}/toggle-status")
    public void toggleStatus(@PathVariable Long id) {
        productService.toggleStatus(id);
    }

    @PatchMapping("/{id}/add-stock")
    public void addStock(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body
    ) {
        productService.addStock(id, body.get("quantity"));
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Long id) {
        return productService.delete(id);
    }
}
