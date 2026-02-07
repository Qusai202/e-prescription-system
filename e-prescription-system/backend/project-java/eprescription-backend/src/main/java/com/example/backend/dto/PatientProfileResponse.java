package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class PatientProfileResponse {

    private Long id;
    private String email;
    private String fullName;
    private Integer age;
    private String gender;
    private String phone;
    private String address;
}
