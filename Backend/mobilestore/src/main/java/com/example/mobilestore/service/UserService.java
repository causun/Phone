package com.example.mobilestore.service;

import com.example.mobilestore.model.User;
import com.example.mobilestore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password){
        Optional<User> userOpt = userRepository.findByEmail(email);
        if(userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())){
            return userOpt;
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
}
