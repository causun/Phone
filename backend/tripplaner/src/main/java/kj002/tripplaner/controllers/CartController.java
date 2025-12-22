package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.CartItemDTO; // Đảm bảo đúng package dtos
import kj002.tripplaner.models.CartItem;
import kj002.tripplaner.models.User;
import kj002.tripplaner.repositories.CartRepository;
import kj002.tripplaner.repositories.ProductRepository;
import kj002.tripplaner.repositories.UserReposiroty;
import kj002.tripplaner.services.CartService; // Thêm service vào
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartRepository cartRepository;
    private final UserReposiroty userReposiroty;
    private final ProductRepository productRepository;
    private final CartService cartService; // Thêm thuộc tính này

    public CartController(CartRepository cartRepository,
                          UserReposiroty userReposiroty,
                          ProductRepository productRepository,
                          CartService cartService) { // Inject vào Constructor
        this.cartRepository = cartRepository;
        this.userReposiroty = userReposiroty;
        this.productRepository = productRepository;
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<?> getCart(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        String email = authentication.getName();
        User user = userReposiroty.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ⭐ SỬA TẠI ĐÂY: Trả về DTO thay vì Entity
        List<CartItemDTO> data = cartService.getCartByUser(user);

        return ResponseEntity.ok(Map.of("data", data));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(Authentication authentication, // Dùng Authentication cho đồng bộ
                                       @RequestParam Long productId,
                                       @RequestParam int quantity) {
        String email = authentication.getName();
        User user = userReposiroty.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        CartItem item = cartRepository.findByUserAndProductId(user, productId)
                .orElse(new CartItem(null, user, productRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại")), 0));

        item.setQuantity(item.getQuantity() + quantity);
        cartRepository.save(item);

        return ResponseEntity.ok(Map.of("message", "Đã thêm vào giỏ hàng"));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        CartItem item = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mục giỏ hàng"));

        if (quantity <= 0) {
            cartRepository.delete(item);
            return ResponseEntity.ok(Map.of("message", "Đã xóa sản phẩm khỏi giỏ"));
        }

        item.setQuantity(quantity);
        cartRepository.save(item);
        return ResponseEntity.ok(Map.of("message", "Cập nhật thành công"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Long id) {
        if (!cartRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy mục cần xóa"));
        }
        cartRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Đã xóa sản phẩm"));
    }
}