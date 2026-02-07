package com.example.backend.repository;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository
        extends JpaRepository<Prescription, Long> {

    List<Prescription> findByPatient(User_Entity patient);

    List<Prescription> findByDoctor(User_Entity doctor); // ✅
}
