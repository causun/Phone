package kj002.demo7.controller;

import jakarta.validation.Valid;
import kj002.demo7.dtos.ProductDTO;
import kj002.demo7.dtos.ProductUpdateDTO;
import kj002.demo7.helpers.ApiResponse;
import kj002.demo7.models.Product;
import kj002.demo7.services.ProductService;
import kj002.demo7.services.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping
    public ResponseEntity<?> getProduct() {
        try {
            List<Product> products = productService.findAll();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(products,
                            "get product successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @PostMapping
    public ResponseEntity<?> addProduct(@Valid @ModelAttribute ProductDTO productDTO,
                                        BindingResult bindingResult) {
        try {
            if (productDTO.getImages() == null && productDTO.getImages().size() == 0) {
                bindingResult.rejectValue("images",
                        "400", "file is required");
            }
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }
            Product productCreated = productService.create(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.created(productCreated,
                            "add product successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            Optional<Product> productExisting = productService.findById(id);
            if (productExisting.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("product not found"));
            }
            productService.delete(productExisting.get());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(productExisting,
                            "delete product successfully"));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
    }

}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @ModelAttribute ProductUpdateDTO productUpdateDTO,
                                        BindingResult bindingResult) {
        try {
            Optional<Product> productExisting = productService.findById(id);
            if (productExisting.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("product not found"));
            }
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.badRequest(bindingResult));
            }
            Product productUpdated = productService.update(productUpdateDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(productUpdated,
                            "update product successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchProducts(@PathVariable("keyword") String keyword) {
        try {
            List<Product> products = productService.searchByName(keyword);
            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notfound("No products found for keyword: " + keyword));
            }
            return ResponseEntity.ok(ApiResponse.success(products, "Search successfully"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
    @GetMapping("/sort")
    public ResponseEntity<List<Product>> sortByPrice(@RequestParam(defaultValue = "asc") String direction) {
        List<Product> sortedProducts = productService.sortByPrice(direction);
        return ResponseEntity.ok(sortedProducts);
    }
    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return productService.searchProducts(keyword, minPrice, maxPrice, direction);
    }
}
