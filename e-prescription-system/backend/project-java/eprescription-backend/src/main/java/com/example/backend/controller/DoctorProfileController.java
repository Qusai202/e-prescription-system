package com.example.backend.controller;

import com.example.backend.dto.DoctorProfileRequest;
import com.example.backend.dto.DoctorProfileResponse;
import com.example.backend.service.DoctorProfileService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor/profile")
@PreAuthorize("hasRole('DOCTOR')")
public class DoctorProfileController {

    private final DoctorProfileService service;

    public DoctorProfileController(DoctorProfileService service) {
        this.service = service;
    }

    @PostMapping
    public DoctorProfileResponse create(
            @RequestBody DoctorProfileRequest request,
            Authentication auth
    ) {
        return service.create(request, auth.getName());
    }

    @GetMapping
    public DoctorProfileResponse get(Authentication auth) {
        return service.get(auth.getName());
    }

    @PutMapping
    public DoctorProfileResponse update(
            @RequestBody DoctorProfileRequest request,
            Authentication auth
    ) {
        return service.update(request, auth.getName());
    }

    @DeleteMapping
    public String delete(Authentication auth) {
        service.delete(auth.getName());
        return "Doctor profile deleted successfully";
    }
}
