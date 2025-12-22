package kj002.tripplaner.controllers;

import jakarta.validation.Valid;
import kj002.tripplaner.models.Contact;
import kj002.tripplaner.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000") // Cấp quyền cho React
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<?> createContact(@Valid @RequestBody Contact contact) {
        try {
            Contact savedContact = contactRepository.save(contact);
            return ResponseEntity.ok(savedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lưu thông tin");
        }
    }
}
