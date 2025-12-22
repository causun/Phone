package kj002.tripplaner.models;

public enum OrderStatus {
    PENDING,         // chờ admin xác nhận
    CONFIRMED,       // admin confirm
    SHIPPING,        // đang giao
    COMPLETED,       // giao thành công
    CANCELLED        // user hủy hoặc admin hủy
}

