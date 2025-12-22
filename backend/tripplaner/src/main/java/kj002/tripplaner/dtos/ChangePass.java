package kj002.tripplaner.dtos;

import lombok.Data;

@Data
public class ChangePass {
    private String email;
    private String newPassword;
    private String oldPassword;
    private String confirmPassword;
}
