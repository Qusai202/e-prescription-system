package com.example.backend.service;

import com.example.backend.dto.PrescriptionRequest;
import com.example.backend.dto.PrescriptionResponse;
import com.example.backend.entity.PharmacyProfile;
import com.example.backend.entity.Prescription;
import com.example.backend.entity.User_Entity;
import com.example.backend.repository.PharmacyProfileRepository;
import com.example.backend.repository.PrescriptionRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepo;
    private final UserRepository userRepo;
    private final PharmacyProfileRepository pharmacyRepo;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepo,
            UserRepository userRepo,
            PharmacyProfileRepository pharmacyRepo
    ) {
        this.prescriptionRepo = prescriptionRepo;
        this.userRepo = userRepo;
        this.pharmacyRepo = pharmacyRepo;
    }

    // ===============================
    // CREATE (Doctor)
    // ===============================
    public PrescriptionResponse create(
            PrescriptionRequest request,
            String doctorEmail
    ) {

        User_Entity doctor = userRepo.findByEmail(doctorEmail)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        User_Entity patient = userRepo.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Prescription p = new Prescription();
        p.setDoctor(doctor);
        p.setPatient(patient);
        p.setMedicationName(request.getMedicationName());
        p.setDosage(request.getDosage());
        p.setInstructions(request.getInstructions());
        p.setStatus("PENDING");
        p.setDispensed(false);

        return mapToResponse(prescriptionRepo.save(p));
    }

    // ===============================
    // ACCEPT (Patient)
    // ===============================
    public PrescriptionResponse accept(Long id, String patientEmail) {

        Prescription p = prescriptionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        if (!p.getPatient().getEmail().equals(patientEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        p.setStatus("ACCEPTED");

        return mapToResponse(prescriptionRepo.save(p));
    }

    // ===============================
    // GET Patient
    // ===============================
    public List<PrescriptionResponse> getForPatient(String email) {

        User_Entity patient = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return prescriptionRepo.findByPatient(patient)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===============================
    // GET Doctor
    // ===============================
    public List<PrescriptionResponse> getForDoctor(String email) {

        User_Entity doctor = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return prescriptionRepo.findByDoctor(doctor)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===============================
    // DISPENSE (Pharmacy)
    // ===============================
    public PrescriptionResponse dispense(Long id, String pharmacyEmail) {

        Prescription p = prescriptionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        User_Entity pharmacyUser = userRepo.findByEmail(pharmacyEmail)
                .orElseThrow(() -> new RuntimeException("Pharmacy user not found"));

        PharmacyProfile pharmacy = pharmacyRepo.findByUser(pharmacyUser)
                .orElseThrow(() -> new RuntimeException("Pharmacy profile not found"));

        p.setPharmacy(pharmacy);
        p.setDispensed(true);
        p.setStatus("DISPENSED");

        return mapToResponse(prescriptionRepo.save(p));
    }

    // ===============================
    // Mapper
    // ===============================
    private PrescriptionResponse mapToResponse(Prescription p) {

        return new PrescriptionResponse(
                p.getId(),
                p.getMedicationName(),
                p.getDosage(),
                p.getInstructions(),
                p.getStatus(),
                p.isDispensed(),
                p.getDoctor().getFullName(),
                p.getPatient().getFullName(),
                p.getPharmacy() != null
                        ? p.getPharmacy().getPharmacyName()
                        : null,
                p.getCreatedAt()
        );
    }
}
