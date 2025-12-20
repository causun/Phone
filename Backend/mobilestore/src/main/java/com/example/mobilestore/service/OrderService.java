package com.example.mobilestore.service;

import com.example.mobilestore.model.Order;
import com.example.mobilestore.model.OrderStatus;
import com.example.mobilestore.repository.OrderRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final JavaMailSender mailSender;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 14;
    private final SecureRandom random = new SecureRandom();

    public OrderService(OrderRepository orderRepo, JavaMailSender mailSender) {
        this.orderRepo = orderRepo;
        this.mailSender = mailSender;
    }

    public Order saveOrder(Order order) {
        if (order.getOrderCode() == null || order.getOrderCode().isEmpty()) {
            order.setOrderCode(generateUniqueOrderCode());
        }
        if(order.getItems() != null){
            order.getItems().forEach(item -> item.setOrder(order));
        }
        return orderRepo.save(order);
    }
    private String generateUniqueOrderCode() {
        String code;
        do {
            code = random.ints(CODE_LENGTH, 0, CHARACTERS.length())
                    .mapToObj(i -> String.valueOf(CHARACTERS.charAt(i)))
                    .collect(Collectors.joining());
        } while (orderRepo.existsByOrderCode(code));
        return code;
    }
    public List<Order> getOrderByUser(Long userId) { return orderRepo.findByUserIdWithItems(userId); }
    public List<Order> getAllOrders() { return orderRepo.findAllWithItems(); }

    public Order updateStatus(Long id, OrderStatus status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));

        order.setStatus(status);
        Order updatedOrder = orderRepo.save(order);

        // Gửi email thông báo trạng thái mới (Chỉ gửi nếu có User gắn với đơn hàng)
        if (updatedOrder.getUser() != null && updatedOrder.getUser().getEmail() != null) {
            sendOrderStatusEmailAsync(updatedOrder);
        }

        return updatedOrder;
    }

    @Async
    public void sendOrderStatusEmailAsync(Order order) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setTo(order.getUser().getEmail());
            helper.setSubject("[Mobile Store] Thông báo trạng thái đơn hàng " + order.getOrderCode());

            // Cấu hình màu sắc và văn bản trạng thái
            String statusText;
            String statusColor;
            if (order.getStatus() == OrderStatus.APPROVED) {
                statusText = "ĐÃ ĐƯỢC XÁC NHẬN";
                statusColor = "#2e7d32"; // Màu xanh lá
            } else {
                statusText = "ĐÃ BỊ HỦY";
                statusColor = "#c62828"; // Màu đỏ
            }

            // Tính tổng tiền
            double total = order.getItems().stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();

            // Xây dựng danh sách sản phẩm bằng table HTML
            StringBuilder itemRows = new StringBuilder();
            for (var item : order.getItems()) {
                itemRows.append(String.format(
                        "<tr>" +
                                "<td style='padding: 8px; border-bottom: 1px solid #eee;'>%s</td>" +
                                "<td style='padding: 8px; border-bottom: 1px solid #eee; text-align: center;'>%d</td>" +
                                "<td style='padding: 8px; border-bottom: 1px solid #eee; text-align: right;'>%,.0f đ</td>" +
                                "</tr>",
                        item.getProductName(), item.getQuantity(), item.getPrice() * item.getQuantity()
                ));
            }

            // Nội dung Email dạng HTML
            String htmlContent = String.format(
                    "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px;'>" +
                            "<p>Đây là tin nhắn tự động được gửi từ <strong>Mobile Store</strong></p>" +
                            "<p>Mã đơn hàng: <strong>%s</strong></p>" +
                            "<p>Trạng thái: <span style='color: %s; font-weight: bold;'>%s</span> bởi Mobile Store</p>" +

                            "<h3 style='border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;'>Chi tiết đơn hàng:</h3>" +
                            "<table style='width: 100%%; border-collapse: collapse;'>" +
                            "<thead>" +
                            "<tr style='background: #f8f8f8;'>" +
                            "<th style='text-align: left; padding: 8px;'>Sản phẩm</th>" +
                            "<th style='padding: 8px;'>SL</th>" +
                            "<th style='text-align: right; padding: 8px;'>Thành tiền</th>" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>%s</tbody>" +
                            "</table>" +

                            "<p style='font-size: 18px;'><strong>Tổng thanh toán: <span style='color: #ef4444;'>%,.0f đ</span></strong></p>" +

                            "<p><strong>Vui lòng kiểm tra trạng thái đơn hàng tại lịch sử mua hàng trong tài khoản của bạn.</strong></p>" +

                            "<p>Cảm ơn bạn đã tin tưởng và lựa chọn Mobile Store. Hy vọng sản phẩm của chúng tôi sẽ làm bạn hài lòng!</p>" +
                            "<hr style='border: none; border-top: 1px solid #eee;' />" +
                            "<p style='font-size: 12px; color: #888;'>Trân trọng,<br/>Đội ngũ Mobile Store 2025.</p>" +
                            "</div>",
                    order.getOrderCode(),
                    statusColor,
                    statusText,
                    itemRows.toString(),
                    total
            );

            helper.setText(htmlContent, true); // Tham số true quan trọng để gửi dạng HTML
            mailSender.send(mimeMessage);

        } catch (Exception e) {
            System.err.println("Lỗi khi gửi mail HTML: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
