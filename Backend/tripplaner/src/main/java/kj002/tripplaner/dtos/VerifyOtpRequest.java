package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class VerifyOtpRequest {
    private String email;
    private String otpCode;
}