package kj002.tripplaner.dtos;

import kj002.tripplaner.models.Role;
import kj002.tripplaner.models.Gender;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String avatar;
    private boolean status;
    private String address;
    private Gender gender;
    private Role role;
}
