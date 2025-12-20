package com.example.mobilestore.service;

import com.example.mobilestore.model.Product;
import com.example.mobilestore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.mobilestore.model.ProductStatus;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Service
public class ProductService {

    private final String UPLOAD_DIR =
            "C:/Aptech/Mobile/Backend/mobilestore/uploads/products/";

    @Autowired
    private ProductRepository productRepo;

    /* ================= SKU ================= */

    public String generateSKU() {
        Random rand = new Random();
        String sku;
        do {
            sku = String.format("%09d", rand.nextInt(1_000_000_000));
        } while (productRepo.existsBySku(sku));
        return sku;
    }

    /* ================= LIST ADMIN ================= */

    public Page<Product> getProducts(String keyword, int page, int size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.by("createdAt").descending());
        return productRepo.searchAdmin(keyword, pageable);
    }

    // ================= LIST USER =================
    public Page<Product> getProducts(String keyword, Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        // Gọi repository user searchProducts
        List<Product> list = productRepo.searchProducts(keyword, categoryId);

        // Chuyển List -> Page
        int start = Math.min((int)pageable.getOffset(), list.size());
        int end = Math.min((start + pageable.getPageSize()), list.size());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    /* ================= GET BY ID ================= */

    public Product getById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    /* ================= CREATE ================= */

    public Product create(Product product, MultipartFile image) throws IOException {

        validatePrice(product.getPrice(), product.getDiscountPrice());

        product.setSku(generateSKU());
        product.setStatus(ProductStatus.OPEN); // ✅ CHUẨN
        product.setSold(0);

        product.setStatus(ProductStatus.OPEN);

        if (image != null && !image.isEmpty()) {
            saveImage(product, image);
        }

        return productRepo.save(product);
    }

    /* ================= UPDATE ================= */

    public Product update(Long id, Product updated, MultipartFile image) throws IOException {
        Product exist = getById(id);
        if (exist == null) return null;

        validatePrice(updated.getPrice(), updated.getDiscountPrice());

        exist.setName(updated.getName());
        exist.setDescription(updated.getDescription());
        exist.setPrice(updated.getPrice());

        if (image != null && !image.isEmpty()) {
            deleteOldImage(exist.getImage());
            saveImage(exist, image);
        }

        return productRepo.save(exist);
    }

    /* ================= TOGGLE STATUS ================= */

    public void toggleStatus(Long id) {
        Product product = getById(id);
        if (product == null) return;

        product.setStatus(
                product.getStatus() == ProductStatus.OPEN
                        ? ProductStatus.CLOSED
                        : ProductStatus.OPEN
        );

        productRepo.save(product);
    }

    /* ================= ADD STOCK ================= */

    public void addStock(Long id, int quantity) {
        if (quantity <= 0) {
            throw new RuntimeException("Số lượng thêm phải > 0");
        }

        Product product = getById(id);
        if (product == null) return;

        product.setStock(product.getStock() + quantity);
        productRepo.save(product);
    }

    /* ================= DELETE ================= */

    public boolean delete(Long id) {
        Product product = getById(id);
        if (product == null) return false;

        deleteOldImage(product.getImage());
        productRepo.deleteById(id);
        return true;
    }

    /* ================= UTIL ================= */

    private void validatePrice(double price, double discountPrice) {
        if (price < 0 || discountPrice < 0 || price > discountPrice) {
            throw new RuntimeException("Giá bán không hợp lệ");
        }
    }

    private void saveImage(Product product, MultipartFile image) throws IOException {
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) folder.mkdirs();

        String fileName = product.getSku() + "_" + image.getOriginalFilename();
        image.transferTo(new File(UPLOAD_DIR + fileName));
        product.setImage(fileName);
    }

    private void deleteOldImage(String imageName) {
        if (imageName == null) return;
        File file = new File(UPLOAD_DIR + imageName);
        if (file.exists()) file.delete();
    }
}
