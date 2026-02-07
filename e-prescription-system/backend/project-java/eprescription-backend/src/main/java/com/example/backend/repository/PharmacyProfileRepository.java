package com.example.backend.repository;

import com.example.backend.entity.PharmacyProfile;
import com.example.backend.entity.User_Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PharmacyProfileRepository
        extends JpaRepository<PharmacyProfile, Long> {

    Optional<PharmacyProfile> findByUser(User_Entity user);
}
