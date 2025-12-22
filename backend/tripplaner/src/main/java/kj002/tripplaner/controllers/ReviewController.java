package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.ReviewDTO;
import kj002.tripplaner.dtos.ReviewRequest;
import kj002.tripplaner.helpers.ApiResponse;
import kj002.tripplaner.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/{orderId}/{productId}")
    public ResponseEntity<?> createOrUpdate(
            @PathVariable Long orderId,
            @PathVariable Long productId,
            @RequestBody ReviewRequest request,
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        try{
            ReviewDTO dto = reviewService.createOrUpdateReview(
                    userId,
                    orderId,
                    productId,
                    request
            );
            return ResponseEntity.ok(
                    ApiResponse.success(dto,"Review submitted")
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/{reviewId}/reply")
    public ResponseEntity<?> reply(
            @PathVariable Long reviewId,
            @RequestBody String reply
    ) {
        try{
            ReviewDTO dto = reviewService.replyReview(reviewId, reply);
            return ResponseEntity.ok(
                    ApiResponse.success(dto,"Reply sent")
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getByProduct(@PathVariable Long productId) {
        try{
            List<ReviewDTO> list = reviewService.getReviewsByProduct(productId);
            return ResponseEntity.ok(
                    ApiResponse.success(list,"Get reviews successfully")
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/me")
    public ResponseEntity<?> getMyReviews(
            @AuthenticationPrincipal(expression = "id") Long userId
    ) {
        try{
            List<ReviewDTO> list = reviewService.getReviewsByUser(userId);
            return ResponseEntity.ok(
                    ApiResponse.success(list,"Get my reviews successfully")
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAll(){
        try{
            List<ReviewDTO> list = reviewService.getAllReviews();
            return ResponseEntity.ok(
                    ApiResponse.success(list,"Get all reviews successfully")
            );
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.errorServer(e.getMessage()));
        }
    }
}
