package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.RevenueResponse;
import kj002.tripplaner.services.RevenueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/revenue")
public class RevenueController {

    private final RevenueService revenueService;

    public RevenueController(RevenueService revenueService) {
        this.revenueService = revenueService;
    }

    /**
     * 📊 Doanh thu theo khoảng ngày
     * VD: /api/admin/revenue?from=2025-12-01&to=2025-12-31
     */
    @GetMapping
    public ResponseEntity<RevenueResponse> getRevenue(
            @RequestParam String from,
            @RequestParam String to
    ) {
        return ResponseEntity.ok(
                revenueService.getRevenue(
                        LocalDate.parse(from),
                        LocalDate.parse(to)
                )
        );
    }

    /**
     * 📅 Doanh thu hôm nay
     * VD: /api/admin/revenue/today
     */
    @GetMapping("/today")
    public ResponseEntity<RevenueResponse> getTodayRevenue() {
        return ResponseEntity.ok(
                revenueService.getTodayRevenue()
        );
    }

    /**
     * 🗓 Doanh thu tháng hiện tại
     * VD: /api/admin/revenue/month
     */
    @GetMapping("/month")
    public ResponseEntity<RevenueResponse> getCurrentMonthRevenue() {
        return ResponseEntity.ok(
                revenueService.getCurrentMonthRevenue()
        );
    }
}
