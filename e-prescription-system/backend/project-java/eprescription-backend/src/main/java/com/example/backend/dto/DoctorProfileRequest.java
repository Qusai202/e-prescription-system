package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorProfileRequest {

    private String specialization;
    private String phone;
    private String clinicAddress;
    private Integer yearsOfExperience;
}
