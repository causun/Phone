package kj002.tripplaner.repositories;

import kj002.tripplaner.models.Otp;
import kj002.tripplaner.models.OtpType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface OTPRepository extends JpaRepository<Otp, Long> {
    @Query("SELECT o FROM Otp o WHERE o.email = :email AND o.otpType = :otpType AND o.code = :otpCode")
    Optional<Otp> findByEmailAndOtpType(@Param("email") String email,
                                        @Param("otpType") OtpType otpType,
                                        @Param("otpCode") String otpCode);
    @Modifying
    @Query("DELETE FROM Otp o " +
            "WHERE o.email = :email " +
            "AND o.otpType = :otpType " +
            "AND o.code <> :otpCode")
    void deleteOldOtps(@Param("email") String email,
                       @Param("otpType") OtpType otpType,
                       @Param("otpCode") String otpCode);
}
