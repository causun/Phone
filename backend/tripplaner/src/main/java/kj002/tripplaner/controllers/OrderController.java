package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.OrderRequest;
import kj002.tripplaner.dtos.OrderResponse;
import kj002.tripplaner.dtos.OrderStatusUpdateRequest;
import kj002.tripplaner.models.User;
import kj002.tripplaner.services.AuthenticationService;
import kj002.tripplaner.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final AuthenticationService authService;

    public OrderController(OrderService orderService,
                           AuthenticationService authService) {
        this.orderService = orderService;
        this.authService = authService;
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> getOrderDetail(
            @PathVariable Long id,
            @RequestAttribute("email") String email
    ) {
        try {
            User user = authService.getUserByEmail(email);
            OrderResponse response = orderService.getOrderDetail(id, user);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> createOrder(
            @RequestBody OrderRequest request,
            @RequestAttribute("email") String email) {

        try {
            User user = authService.getUserByEmail(email);
            OrderResponse res = orderService.placeOrder(user, request);
            return ResponseEntity.ok(res);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @GetMapping("/my")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> myOrders(@RequestAttribute("email") String email) {
        try {
            User user = authService.getUserByEmail(email);
            List<OrderResponse> res = orderService.getOrdersByUser(user);
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long id,
            @RequestAttribute("email") String email) {

        try {
            User user = authService.getUserByEmail(email);
            orderService.cancelOrder(user, id);
            return ResponseEntity.ok("Order cancelled successfully!");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody OrderStatusUpdateRequest dto) {

        try {
            orderService.updateStatus(id, dto.getStatus());
            return ResponseEntity.ok("Order updated successfully to " + dto.getStatus());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống: " + e.getMessage());
        }
    }
}
