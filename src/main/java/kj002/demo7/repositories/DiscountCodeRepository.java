package kj002.demo7.repositories;

import kj002.demo7.models.DiscountCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountCodeRepository extends JpaRepository<DiscountCode, Long> {

    DiscountCode findByCode(String code);
}
