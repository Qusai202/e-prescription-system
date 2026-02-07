package com.example.backend.dto;

public record DoctorListResponse(
        Long id,
        String fullName,
        String email,
        String specialization
) {}
