package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Pharmacy
    @ManyToOne
    private PharmacyProfile pharmacy;

    // Doctor (User)
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User_Entity doctor;

    // Patient (User)
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User_Entity patient;

    @Column(nullable = false)
    private String medicationName;

    @Column(nullable = false)
    private String dosage;

    @Column(nullable = false)
    private String instructions;

    private String status = "PENDING";
    private boolean dispensed = false;

    private LocalDateTime createdAt = LocalDateTime.now();

}
