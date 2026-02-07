package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientProfileRequest {

    private Integer age;
    private String gender;
    private String phone;
    private String address;
}
