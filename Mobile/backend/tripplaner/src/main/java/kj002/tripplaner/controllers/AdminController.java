package kj002.tripplaner.controllers;

import kj002.tripplaner.dtos.UserDTO;
import kj002.tripplaner.models.User;
import kj002.tripplaner.repositories.UserReposiroty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserReposiroty userRepository;

    public AdminController(UserReposiroty userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            List<UserDTO> users = userRepository.findAll().stream().map(user -> {
                UserDTO dto = new UserDTO();
                dto.setId(user.getId());
                dto.setEmail(user.getEmail());
                dto.setFullName(user.getFullName());
                dto.setPhone(user.getPhone());
                dto.setAvatar(user.getAvatar());
                dto.setStatus(user.isStatus());
                dto.setAddress(user.getAddress());
                dto.setGender(user.getGender());
                dto.setRole(user.getRole());
                return dto;
            }).toList();

            return ResponseEntity.ok(users);

        } catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error getting users: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            return userRepository.findById(id)
                    .map(user -> {
                        // convert sang DTO
                        UserDTO dto = new UserDTO();
                        dto.setId(user.getId());
                        dto.setEmail(user.getEmail());
                        dto.setFullName(user.getFullName());
                        dto.setPhone(user.getPhone());
                        dto.setAvatar(user.getAvatar());
                        dto.setStatus(user.isStatus());
                        dto.setAddress(user.getAddress());
                        dto.setGender(user.getGender());
                        dto.setRole(user.getRole());
                        return ResponseEntity.ok(dto);
                    })
                    .orElse(ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(new UserDTO()));

        } catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/lock")
    public ResponseEntity<?> lockUser(@PathVariable Long id) {
        try {
            return userRepository.findById(id)
                    .map(user -> {
                        user.setStatus(false);
                        userRepository.save(user);
                        return ResponseEntity.ok("User locked");
                    })
                    .orElse(ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body("User not found"));

        } catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/unlock")
    public ResponseEntity<?> unlockUser(@PathVariable Long id) {
        try {
            return userRepository.findById(id)
                    .map(user -> {
                        user.setStatus(true);
                        userRepository.save(user);
                        return ResponseEntity.ok("User unlocked");
                    })
                    .orElse(ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body("User not found"));

        } catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            if (!userRepository.existsById(id)) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted");

        } catch (Exception e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting user: " + e.getMessage());
        }
    }
}
