package com.example.backend.repository;

import com.example.backend.entity.PatientProfile;
import com.example.backend.entity.User_Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientProfileRepository
        extends JpaRepository<PatientProfile, Long> {

    Optional<PatientProfile> findByUser(User_Entity user);
}
