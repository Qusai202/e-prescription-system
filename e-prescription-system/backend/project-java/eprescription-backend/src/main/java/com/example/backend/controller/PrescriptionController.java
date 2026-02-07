package com.example.backend.controller;

import com.example.backend.dto.PrescriptionRequest;
import com.example.backend.dto.PrescriptionResponse;
import com.example.backend.service.PrescriptionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    // ===============================
    // CREATE (Doctor)
    // ===============================
    @PostMapping
    @PreAuthorize("hasRole('DOCTOR')")
    public PrescriptionResponse create(
            @RequestBody PrescriptionRequest request,
            Authentication auth
    ) {
        return service.create(request, auth.getName());
    }

    // ===============================
    // ACCEPT (Patient)
    // ===============================
    @PutMapping("/{id}/accept")
    @PreAuthorize("hasRole('PATIENT')")
    public PrescriptionResponse accept(
            @PathVariable Long id,
            Authentication auth
    ) {
        return service.accept(id, auth.getName());
    }

    // ===============================
    // GET Patient Prescriptions
    // ===============================
    @GetMapping("/patient")
    @PreAuthorize("hasRole('PATIENT')")
    public List<PrescriptionResponse> patient(Authentication auth) {
        return service.getForPatient(auth.getName());
    }

    // ===============================
    // GET Doctor Prescriptions
    // ===============================
    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<PrescriptionResponse> doctor(Authentication auth) {
        return service.getForDoctor(auth.getName());
    }

    // ===============================
    // DISPENSE (Pharmacy)
    // ===============================
    @PutMapping("/{id}/dispense")
    @PreAuthorize("hasRole('PHARMACY')")
    public PrescriptionResponse dispense(
            @PathVariable Long id,
            Authentication auth
    ) {
        return service.dispense(id, auth.getName());
    }
}
