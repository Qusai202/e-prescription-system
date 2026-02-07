package com.example.backend.controller;

import com.example.backend.dto.DoctorListResponse;
import com.example.backend.dto.UserProfileResponse;
import com.example.backend.service.DoctorProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorController {

    private final DoctorProfileService doctorProfileService;

    @GetMapping("/patients")
    public List<UserProfileResponse> getPatients() {
        return doctorProfileService.getAllPatients();
    }
}

