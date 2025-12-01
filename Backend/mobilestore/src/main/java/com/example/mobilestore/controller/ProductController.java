package com.example.mobilestore.controller;

import com.example.mobilestore.model.Product;
import com.example.mobilestore.model.Category;
import com.example.mobilestore.service.ProductService;
import com.example.mobilestore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductService productService;
    @Autowired private CategoryService categoryService;

    // Lấy tất cả sản phẩm active
    @GetMapping
    public List<Product> getAll(){
        return productService.getAllActiveProducts();
    }

    // Lấy chi tiết sản phẩm theo id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getDetail(@PathVariable Long id){
        Product product = productService.getById(id);
        if(product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
    }

    // Tìm kiếm sản phẩm theo name hoặc categoryId
    @GetMapping("/search")
    public List<Product> search(@RequestParam(required = false) String name,
                                @RequestParam(required = false) Long categoryId){
        if(name != null) return productService.searchByName(name);
        if(categoryId != null) return productService.searchByCategory(categoryId);
        return productService.getAllActiveProducts();
    }

    // Thêm sản phẩm mới
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product){
        // Kiểm tra category có tồn tại không
        if(product.getCategory() != null){
            Category c = categoryService.getById(product.getCategory().getId());
            if(c == null) return ResponseEntity.badRequest().body(null);
            product.setCategory(c);
        }
        Product saved = productService.save(product);
        return ResponseEntity.ok(saved);
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product){
        Product existing = productService.getById(id);
        if(existing == null) return ResponseEntity.notFound().build();

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());
        existing.setMainImage(product.getMainImage());
        existing.setSubImages(product.getSubImages());
        existing.setActive(product.isActive());

        if(product.getCategory() != null){
            Category c = categoryService.getById(product.getCategory().getId());
            if(c != null) existing.setCategory(c);
        }

        Product updated = productService.save(existing);
        return ResponseEntity.ok(updated);
    }

    // Xóa sản phẩm (hoặc chỉ disable)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Product existing = productService.getById(id);
        if(existing == null) return ResponseEntity.notFound().build();

        productService.delete(existing); // cần thêm method delete trong ProductService
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/toggle/{id}")
    public ResponseEntity<Product> toggleStatus(@PathVariable Long id){
        Product p = productService.getById(id);
        if(p == null) return ResponseEntity.notFound().build();

        p.setActive(!p.isActive());
        Product saved = productService.save(p);
        return ResponseEntity.ok(saved);
    }


    @PostMapping("/upload")
    public ResponseEntity<Product> uploadProduct(
            @RequestParam String name,
            @RequestParam double price,
            @RequestParam int stock,
            @RequestParam Long categoryId,
            @RequestParam boolean active,
            @RequestParam(required = false) MultipartFile mainImage,
            @RequestParam(required = false) List<MultipartFile> subImages
    ) {
        Category category = categoryService.getById(categoryId);
        if (category == null) return ResponseEntity.badRequest().build();

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setActive(active);

        // Nơi lưu ảnh
        final String UPLOAD_DIR = "C:/Aptech/Mobile/Backend/mobilestore/uploads/products/";

        try {
            // Tạo folder nếu chưa tồn tại
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Log để debug
            System.out.println("Uploading product: " + name + ", categoryId: " + categoryId);
            if(mainImage != null) System.out.println("Main image: " + mainImage.getOriginalFilename());
            if(subImages != null) subImages.forEach(f -> System.out.println("Sub image: " + f.getOriginalFilename()));

            // Main image
            if (mainImage != null && !mainImage.isEmpty()) {
                String mainFileName = System.currentTimeMillis() + "_" + mainImage.getOriginalFilename();
                Path mainPath = uploadPath.resolve(mainFileName);
                mainImage.transferTo(mainPath.toFile());
                product.setMainImage("/uploads/products/" + mainFileName);
            }

            // Sub images
            if (subImages != null && !subImages.isEmpty()) {
                List<String> subPaths = new ArrayList<>();
                for (MultipartFile file : subImages) {
                    if (file.isEmpty()) continue;
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path path = uploadPath.resolve(fileName);
                    file.transferTo(path.toFile());
                    subPaths.add("/uploads/products/" + fileName);
                }
                product.setSubImages(subPaths);
            }

            Product saved = productService.save(product);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }




}
