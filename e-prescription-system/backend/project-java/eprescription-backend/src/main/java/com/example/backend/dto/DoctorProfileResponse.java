package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class DoctorProfileResponse {

    private Long id;
    private String email;
    private String fullName;
    private String specialization;
    private String phone;
    private String clinicAddress;
    private Integer yearsOfExperience;
}
