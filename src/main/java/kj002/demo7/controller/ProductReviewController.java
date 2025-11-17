//package kj002.demo7.controllers;
//
//import kj002.demo7.models.ProductReview;
//import kj002.demo7.models.User;
//import kj002.demo7.services.ProductReviewService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/reviews")
//public class ProductReviewController {
//
//    private final ProductReviewService reviewService;
//
//    public ProductReviewController(ProductReviewService reviewService) {
//        this.reviewService = reviewService;
//    }
//
//    @PostMapping
//    public ProductReview createReview(
//            @RequestParam Long orderDetailId,
//            @RequestParam int rating,
//            @RequestParam String comment,
//            @RequestAttribute("user") User user // giả sử user đã login
//    ) {
//        return reviewService.addReview(orderDetailId, rating, comment, user);
//    }
//}
