package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrescriptionRequest {

    private Long patientId;
    private String medicationName;
    private String dosage;
    private String instructions;
}
