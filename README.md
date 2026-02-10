# 🏥 E-Prescription Management System

A secure, full-stack healthcare system designed to digitize and manage medical prescriptions using a role-based architecture.

This project simulates a real-world production environment where doctors, patients, and pharmacies interact through a unified, secure platform.

---

## 🚀 Project Overview

The E-Prescription Management System automates the entire prescription lifecycle:
- Doctors create and send electronic prescriptions
- Patients review and accept prescriptions
- Pharmacies dispense medications and update prescription status

The system replaces traditional paper-based workflows with a structured, secure, and scalable digital solution.

---

## 👥 User Roles & Capabilities

### 👨‍⚕️ Doctor
- Create and manage doctor profiles
- View registered patients
- Create and send electronic prescriptions

### 🧑‍⚕️ Patient
- View personal prescriptions
- Accept prescriptions
- Track prescription status (Pending / Accepted / Dispensed)

### 🏥 Pharmacy
- View assigned prescriptions
- Dispense medications
- Update prescription status

---

## 🔐 Security & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Secure REST API endpoints
- Separation of concerns between roles

---

## 🧠 System Architecture

- Backend built with layered architecture (Controller → Service → Repository)
- Clean separation between frontend and backend
- Relational database design with enforced constraints
- RESTful API communication

---

## 🛠 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security (JWT Authentication)
- JPA / Hibernate

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Context API

### Database
- PostgreSQL
- Relational schema with foreign keys and constraints

### Tools
- Postman (API Testing & Debugging)
- IntelliJ IDEA / VS Code

---

## 📂 Project Structure
e-prescription-system/
│
├── backend/ # Spring Boot backend application
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── model/
│ └── security/
│
├── frontend/ # React + TypeScript frontend
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── services/
│
└── README.md


---

## 📈 What I Learned

- Designing and building a complete full-stack system from scratch
- Implementing JWT authentication and role-based authorization
- Designing secure and consistent relational databases
- Handling complex entity relationships
- Building clean and maintainable backend architecture
- Integrating frontend and backend in a production-like workflow

---

## 🎯 Why This Project Matters

This project was built to closely resemble real-world healthcare systems by focusing on:
- Security
- Scalability
- Clear role separation
- Clean architecture

It goes beyond a demo by addressing real problems found in production systems.

---
