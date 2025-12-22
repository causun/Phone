package kj002.tripplaner.helpers;

import org.springframework.validation.BindingResult;

public class ApiResponse<T> {

    private T data;
    private String message;
    private int status;

    public ApiResponse() {}

    public ApiResponse(T data, String message, int status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }


    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }


    // ========================
    // RESPONSE TEMPLATES
    // ========================

    /** 200 OK */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message, 200);
    }

    /** 201 CREATED */
    public static <T> ApiResponse<T> created(T data, String message) {
        return new ApiResponse<>(data, message, 201);
    }

    /** 400 BAD REQUEST (Validation errors) */
    public static ApiResponse<Object> badRequest(BindingResult bindingResult) {
        return new ApiResponse<>(
                bindingResult.getAllErrors(),
                "Dữ liệu không hợp lệ!",
                400
        );
    }

    /** 400 BAD REQUEST (normal string error) */
    public static ApiResponse<Object> badRequest(String message) {
        return new ApiResponse<>(
                null,
                message,
                400
        );
    }

    /** 404 NOT FOUND */
    public static ApiResponse<Object> notfound(String message) {
        return new ApiResponse<>(null, message, 404);
    }

    /** 500 INTERNAL SERVER ERROR */
    public static ApiResponse<Object> errorServer(String message) {
        return new ApiResponse<>(null, message, 500);
    }

    /** CUSTOM */
    public static <T> ApiResponse<T> custom(T data, String message, int status) {
        return new ApiResponse<>(data, message, status);
    }
}
