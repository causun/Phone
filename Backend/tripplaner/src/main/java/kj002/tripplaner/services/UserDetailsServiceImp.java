package kj002.tripplaner.services;

import kj002.tripplaner.repositories.UserReposiroty;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// Đánh dấu class này là một service của Spring
@Service
public class UserDetailsServiceImp implements UserDetailsService {
    // Khai báo UserRepository để tương tác với cơ sở dữ liệu
    private UserReposiroty repository;
    public UserDetailsServiceImp(UserReposiroty repository) {
        this.repository = repository;
    }
    // Override phương thức loadUserByUsername từ interface UserDetailsService
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm người dùng theo email từ cơ sở dữ liệu
        return repository.findByEmail(email)
                // Nếu không tìm thấy thì throw ra ngoại lệ UsernameNotFoundException
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
