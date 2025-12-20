package kj002.tripplaner.services;

import kj002.tripplaner.dtos.OrderItemRequest;
import kj002.tripplaner.dtos.OrderItemResponse;
import kj002.tripplaner.dtos.OrderRequest;
import kj002.tripplaner.dtos.OrderResponse;
import kj002.tripplaner.models.*;
import kj002.tripplaner.repositories.OrderRepository;
import kj002.tripplaner.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmailService emailService;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        EmailService emailService,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.productRepository = productRepository;
    }
    private String formatMoney(double value) {
        DecimalFormat df = new DecimalFormat("#,###");
        return df.format(value).replace(",", ".");
    }
    private void sendOrderSuccessEmail(User user, Order order) {

        String subject = "🎉 Xác nhận đơn hàng #" + order.getId() + " – Đặt hàng thành công!";

        // Build items table HTML
        StringBuilder itemsHtml = new StringBuilder();
        for (OrderItem item : order.getItems()) {
            itemsHtml.append("""
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">%s</td>
                    <td style="padding: 8px; border: 1px solid #ddd; text-align:center;">%s</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">%s VNĐ</td>
                </tr>
            """.formatted(
                    item.getProduct().getName(),
                    item.getQuantity(),
                    formatMoney(item.getPrice())
            ));
        }
        String orderDetailUrl = "http://localhost:3000/order/" + order.getId();

        String content = """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;
                        border: 1px solid #e0e0e0; border-radius: 10px; background: #fafafa;">

                <h2 style="text-align: center; color: #007bff;">
                    🛒 ĐẶT HÀNG THÀNH CÔNG!
                </h2>

                <p>Xin chào <b>%s</b>,</p>
                <p>Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Dưới đây là thông tin đơn hàng của bạn:</p>

                <table style="width: 100%%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background: #f2f2f2;">
                            <th style="padding: 10px; border: 1px solid #ddd;">Sản phẩm</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">SL</th>
                            <th style="padding: 10px; border: 1px solid #ddd;">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        %s
                    </tbody>
                </table>

                <div style="margin-top: 15px; padding: 15px; background: #ffffff; border-radius: 8px;
                            border: 1px solid #ddd;">
                    <p style="margin: 0;"><b>Tổng tiền:</b> %s VNĐ</p>
                </div>

                <p style="margin-top: 25px;">
                    Chúng tôi sẽ sớm xác nhận và tiến hành giao hàng cho bạn trong thời gian ngắn nhất.
                </p>

                <div style="margin-top: 25px; text-align: center;">
                    <a href="%s" style="background: #007bff; color: white; padding: 10px 18px;
                                       text-decoration: none; border-radius: 5px;">
                        Xem chi tiết đơn hàng
                    </a>
                </div>

                <p style="font-size: 12px; color: #777; margin-top: 25px; text-align: center;">
                    Đây là email tự động, vui lòng không phản hồi lại.
                </p>

            </div>
        """.formatted(
                user.getFullName(),
                itemsHtml,
                formatMoney(order.getTotalPrice()),
                orderDetailUrl
        );

        emailService.sendHtmlMail(user.getEmail(), subject, content);
    }
    private void sendOrderCompletedEmail(User user, Order order) {

        String subject = "🎉 Đơn hàng #" + order.getId() + " đã được giao thành công!";

        String orderDetailUrl = "http://localhost:3000/order/" + order.getId();

        String content = """
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;
                        border: 1px solid #e0e0e0; border-radius: 10px; background: #fafafa;">
                
                <h2 style="text-align: center; color: #28a745;">
                    🎉 GIAO HÀNG THÀNH CÔNG!
                </h2>

                <p>Xin chào <b>%s</b>,</p>
                <p>Đơn hàng của bạn đã được giao thành công.</p>

                <div style="padding: 15px; background: #ffffff; border-radius: 8px; border: 1px solid #ddd;">
                    <p style="margin: 4px 0;"><b>Mã đơn hàng:</b> #%s</p>
                    <p style="margin: 4px 0;"><b>Tổng tiền thanh toán:</b> %s VNĐ</p>
                </div>

                <p style="margin-top: 20px;">
                    Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi ❤️
                </p>

                <div style="margin-top: 25px; text-align: center;">
                    <a href="%s" style="background: #28a745; color: white; padding: 10px 18px;
                                       text-decoration: none; border-radius: 5px;">
                        Xem chi tiết đơn hàng
                    </a>
                </div>

                <p style="font-size: 12px; color: #777; margin-top: 25px; text-align: center;">
                    Đây là email tự động, vui lòng không phản hồi lại.
                </p>

            </div>
        """.formatted(
                user.getFullName(),
                order.getId(),
                formatMoney(order.getTotalPrice()),
                orderDetailUrl
        );

        emailService.sendHtmlMail(user.getEmail(), subject, content);
    }

    @Transactional
    public OrderResponse placeOrder(User user, OrderRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Giỏ hàng đang trống");
        }

        Order order = new Order();
        order.setUser(user);

        List<OrderItem> orderItems = new ArrayList<>();
        double totalPrice = 0;

        // LẤY LIST PRODUCT ID & SORT
        List<Long> productIds = request.getItems().stream()
                .map(OrderItemRequest::getProductId)
                .distinct()
                .sorted()
                .toList();

        //  LOAD ALL PRODUCTS 1 LẦN
        List<Product> products = productRepository.findAllById(productIds);

        // Map để lookup nhanh
        var productMap = products.stream()
                .collect(java.util.stream.Collectors.toMap(Product::getId, p -> p));

        // VALIDATE + UPDATE STOCK
        for (OrderItemRequest req : request.getItems()) {

            Product product = productMap.get(req.getProductId());

            if (product == null) {
                throw new IllegalArgumentException("Sản phẩm không tồn tại");
            }

            if (product.getStatus() != ProductStatus.ACTIVE) {
                throw new IllegalArgumentException("Sản phẩm đang tạm khóa: " + product.getName());
            }

            if (product.getQuantityInStock() < req.getQuantity()) {
                throw new IllegalArgumentException("Không đủ hàng: " + product.getName());
            }

            product.setQuantityInStock(
                    product.getQuantityInStock() - req.getQuantity()
            );

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(req.getQuantity());
            item.setPrice(product.getPrice());

            totalPrice += product.getPrice() * req.getQuantity();
            orderItems.add(item);
        }

        //  SAVE PRODUCT 1 LẦN
        productRepository.saveAll(products);

        // SAVE ORDER =
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order saved = orderRepository.save(order);

        // SEND MAIL (OUTSIDE DB LOGIC)
        sendOrderSuccessEmail(user, saved);

        return toOrderResponse(saved);
    }

    private OrderResponse toOrderResponse(Order saved) {
        OrderResponse dto = new OrderResponse();
        dto.setId(saved.getId());
        dto.setFullName(saved.getUser().getFullName());
        dto.setPhone(saved.getUser().getPhone());
        dto.setAddress(saved.getUser().getAddress());
        dto.setStatus(saved.getStatus().name());
        dto.setTotalPrice(saved.getTotalPrice());
        dto.setCreatedAt(saved.getCreatedAt());
        return dto;
    }

    private void restoreStock(Order order) {
        for (OrderItem item : order.getItems()) {
            Product p = item.getProduct();
            p.setQuantityInStock(p.getQuantityInStock() + item.getQuantity());
            productRepository.save(p);
        }
    }

    public List<OrderResponse> getOrdersByUser(User user) {
        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream().map(o -> {
            OrderResponse dto = toOrderResponse(o);

            dto.setItems(
                    o.getItems().stream().map(item -> {
                        OrderItemResponse i = new OrderItemResponse();
                        i.setProductId(item.getProduct().getId());
                        i.setProductName(item.getProduct().getName());
                        i.setPrice(item.getPrice());
                        i.setQuantity(item.getQuantity());

                        String img = item.getProduct().getImages().stream()
                                .filter(ProductImage::isThumbnail)
                                .map(ProductImage::getImageUrl)
                                .findFirst()
                                .orElse(item.getProduct().getImages().isEmpty()
                                        ? null
                                        : item.getProduct().getImages().get(0).getImageUrl());

                        i.setImageUrl(img);
                        return i;
                    }).toList()
            );

            return dto;
        }).toList();
    }
    // USER CANCEL ORDER
    @Transactional
    public void cancelOrder(User user, Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order không tồn tại"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Bạn không thể hủy đơn của người khác");
        }

        if (order.getStatus() == OrderStatus.PENDING ||
                order.getStatus() == OrderStatus.CONFIRMED) {

            restoreStock(order);

            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);

        } else {
            throw new IllegalArgumentException("Đơn hàng không thể hủy");
        }
    }
    // ADMIN UPDATE ORDER STATUS
    @Transactional
    public void updateStatus(Long orderId, OrderStatus status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order không tồn tại"));

        if (order.getStatus() == OrderStatus.COMPLETED) {
            throw new IllegalArgumentException("Đơn đã giao thành công, không thể thay đổi nữa");
        }

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new IllegalArgumentException("Đơn đã bị hủy, không thể thay đổi trạng thái");
        }

        // If admin cancels → restore stock
        if (status == OrderStatus.CANCELLED &&
                (order.getStatus() == OrderStatus.PENDING ||
                        order.getStatus() == OrderStatus.CONFIRMED)) {

            restoreStock(order);
        }

        order.setStatus(status);
        orderRepository.save(order);

        // SEND EMAIL WHEN COMPLETED
        if (status == OrderStatus.COMPLETED) {
            sendOrderCompletedEmail(order.getUser(), order);
        }
    }
    // ADMIN GET ALL ORDERS
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(o -> {
            OrderResponse dto = toOrderResponse(o);

            dto.setItems(
                    o.getItems().stream().map(item -> {
                        OrderItemResponse i = new OrderItemResponse();
                        i.setProductId(item.getProduct().getId());
                        i.setProductName(item.getProduct().getName());
                        i.setQuantity(item.getQuantity());
                        i.setPrice(item.getPrice());

                        String img = item.getProduct().getImages().stream()
                                .filter(ProductImage::isThumbnail)
                                .map(ProductImage::getImageUrl)
                                .findFirst()
                                .orElse(item.getProduct().getImages().isEmpty()
                                        ? null
                                        : item.getProduct().getImages().get(0).getImageUrl());

                        i.setImageUrl(img);

                        return i;
                    }).toList()
            );

            return dto;

        }).toList();
    }
    // USER GET SINGLE ORDER
    public OrderResponse getOrderDetail(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Bạn không thể xem đơn hàng của người khác");
        }
        OrderResponse dto = toOrderResponse(order);

        dto.setItems(
                order.getItems().stream().map(item -> {
                    OrderItemResponse i = new OrderItemResponse();
                    i.setProductId(item.getProduct().getId());
                    i.setProductName(item.getProduct().getName());
                    i.setQuantity(item.getQuantity());
                    i.setPrice(item.getPrice());
                    String img = item.getProduct().getImages().stream()
                            .filter(ProductImage::isThumbnail)
                            .map(ProductImage::getImageUrl)
                            .findFirst()
                            .orElse(
                                    item.getProduct().getImages().isEmpty()
                                            ? null
                                            : item.getProduct().getImages().get(0).getImageUrl()
                            );

                    i.setImageUrl(img);

                    return i;
                }).toList()
        );

        return dto;
    }
}
