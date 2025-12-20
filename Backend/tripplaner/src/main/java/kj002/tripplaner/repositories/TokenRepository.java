package kj002.tripplaner.repositories;

import kj002.tripplaner.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("SELECT t FROM Token t INNER JOIN User u on t.user.id = u.id" +
            " WHERE t.user.id = :userId and t.logOut = false")
    List<Token> findAccessTokenByUser(Long userId);
    Optional<Token> findByAccessToken(String token);
    Optional<Token> findByRefreshToken(String refreshToken);
}
