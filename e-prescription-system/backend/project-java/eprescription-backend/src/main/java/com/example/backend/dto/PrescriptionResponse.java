package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PrescriptionResponse {

    private Long id;

    private String medicationName;
    private String dosage;
    private String instructions;

    private String status;
    private boolean dispensed;

    private String doctorName;
    private String patientName;
    private String pharmacyName;

    private LocalDateTime createdAt;
}
