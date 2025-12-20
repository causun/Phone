package com.example.mobilestore.dto;

import lombok.Data;

@Data
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public ApiResponse(boolean success, String message, T data){
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> success(T data){
        return new ApiResponse<>(true, "OK", data);
    }

    public static <T> ApiResponse<T> fail(String message){
        return new ApiResponse<>(false, message, null);
    }
}
