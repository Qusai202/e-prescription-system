package com.example.backend.repository;

import com.example.backend.entity.User_Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User_Entity, Long> {

    Optional<User_Entity> findByEmail(String email);

    boolean existsByEmail(String email);

    // ✅ إرجاع جميع المرضى
    @Query("""
        SELECT u FROM User_Entity u
        JOIN u.roles r
        WHERE r.name = 'ROLE_PATIENT'
    """)
    List<User_Entity> findAllPatients();
}
