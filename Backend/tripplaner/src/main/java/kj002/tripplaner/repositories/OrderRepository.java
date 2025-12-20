package kj002.tripplaner.repositories;

import kj002.tripplaner.models.Order;
import kj002.tripplaner.models.OrderStatus;
import kj002.tripplaner.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // user lấy đơn của họ
    List<Order> findByUser(User user);

    // admin lọc theo trạng thái
    List<Order> findByStatus(OrderStatus status);

    @Query("""
    SELECT CASE WHEN COUNT(i)>0 THEN true ELSE false END 
    FROM Order o JOIN o.items i 
    WHERE o.user.id = :userId 
      AND i.product.id = :productId 
      AND o.status = :status
""")
    boolean existsByUserIdAndProductIdAndStatus(
            Long userId,
            Long productId,
            OrderStatus status
    );

    // ===== DOANH THU THEO KHOẢNG NGÀY =====
    @Query("""
        SELECT COALESCE(SUM(o.totalPrice), 0)
        FROM Order o
        WHERE o.status = :status
        AND o.createdAt BETWEEN :from AND :to
    """)
    Double sumRevenueBetween(
            @Param("status") OrderStatus status,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to
    );

    // ===== ĐẾM SỐ ĐƠN =====
    Long countByStatusAndCreatedAtBetween(
            OrderStatus status,
            LocalDateTime from,
            LocalDateTime to
    );

}
