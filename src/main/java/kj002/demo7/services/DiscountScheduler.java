package kj002.demo7.services;

import kj002.demo7.models.DiscountCode;
import kj002.demo7.models.DiscountStatus;
import kj002.demo7.repositories.DiscountCodeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DiscountScheduler {

    private final DiscountCodeRepository repo;

    public DiscountScheduler(DiscountCodeRepository repo) {
        this.repo = repo;
    }

    @Scheduled(fixedRate = 6000) // chạy mỗi 1 phút
    public void checkExpired() {

        LocalDateTime now = LocalDateTime.now();

        for (DiscountCode dc : repo.findAll()) {
            if (now.isAfter(dc.getEndDateTime())) {
                dc.setStatus(DiscountStatus.EXPIRED);
                repo.save(dc);
            }
        }
    }
}