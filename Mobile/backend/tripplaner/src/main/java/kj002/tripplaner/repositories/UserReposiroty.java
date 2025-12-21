package kj002.tripplaner.repositories;

import kj002.tripplaner.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserReposiroty extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
