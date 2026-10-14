CREATE DATABASE IF NOT EXISTS drbhosale_clinic;
USE drbhosale_clinic;

CREATE TABLE IF NOT EXISTS appointments (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  patient_name      VARCHAR(100) NOT NULL,
  patient_phone     VARCHAR(20)  NOT NULL,
  patient_email     VARCHAR(150) NULL,
  patient_age       INT          NULL,
  consultation_type ENUM('in_person', 'phone') NOT NULL,
  reason            TEXT         NULL,
  appointment_date  DATE         NOT NULL,
  appointment_time  TIME         NOT NULL,
  status            ENUM('pending', 'confirmed', 'cancelled', 'completed')
                    NOT NULL DEFAULT 'pending',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT uq_slot UNIQUE (appointment_date, appointment_time),
  INDEX idx_date_status (appointment_date, status)
);

CREATE TABLE IF NOT EXISTS admins (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);