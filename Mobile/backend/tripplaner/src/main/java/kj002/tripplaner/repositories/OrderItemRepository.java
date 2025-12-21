package kj002.tripplaner.repositories;

import kj002.tripplaner.models.OrderItem;
import kj002.tripplaner.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);


}
