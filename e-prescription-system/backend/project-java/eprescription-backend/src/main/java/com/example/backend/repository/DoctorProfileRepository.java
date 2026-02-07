package com.example.backend.repository;

import com.example.backend.entity.DoctorProfile;
import com.example.backend.entity.User_Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorProfileRepository
        extends JpaRepository<DoctorProfile, Long> {

    Optional<DoctorProfile> findByUser(User_Entity user);
}
