    package com.example.backend.entity;

    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Table(name = "patient_profiles")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class PatientProfile {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToOne
        @JoinColumn(name = "user_id", nullable = false, unique = true)
        private User_Entity user;

        private Integer age;
        private String gender;
        private String phone;
        private String address;
    }
