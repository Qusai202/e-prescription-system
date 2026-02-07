package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pharmacy_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PharmacyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User_Entity user;

    @Column(nullable = false)
    private String pharmacyName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    private boolean open24Hours;
}
