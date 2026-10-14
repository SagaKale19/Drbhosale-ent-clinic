import pool from "../config/db.js";
import { SLOTS } from "../config/clinic.js"; 
/**
 * POST /api/appointments
 * Public — a patient books a slot
 */
export const createAppointment = async (req, res, next) => {
  try {
    const {
      patient_name,
      patient_phone,
      patient_email,
      patient_age,
      consultation_type,
      reason,
      appointment_date,
      appointment_time,
    } = req.body;

    if (!SLOTS.includes(appointment_time)) {
  return res.status(400).json({ success: false, message: "Invalid appointment time." });
}

if (new Date(`${appointment_date}T00:00:00`).getDay() === 0) {
  return res.status(400).json({ success: false, message: "The clinic is closed on Sundays." });
}
    const [result] = await pool.query(
      `INSERT INTO appointments
        (patient_name, patient_phone, patient_email, patient_age,
         consultation_type, reason, appointment_date, appointment_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patient_name,
        patient_phone,
        patient_email || null,
        patient_age || null,
        consultation_type,
        reason || null,
        appointment_date,
        appointment_time,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Appointment requested. The clinic will confirm shortly.",
      data: { id: result.insertId },
    });
  } catch (error) {
    // The UNIQUE constraint rejected a double booking
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "That time slot has just been taken. Please choose another.",
      });
    }
    next(error);
  }
};

/**
 * GET /api/appointments/availability?date=2026-10-10
 * Public — which slots are still free on a given date
 */
export const getAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;

    const [rows] = await pool.query(
      `SELECT appointment_time FROM appointments
       WHERE appointment_date = ? AND status != 'cancelled'`,
      [date]
    );

    const taken = rows.map((row) => row.appointment_time);
    const available = SLOTS.filter((slot) => !taken.includes(slot));

    res.json({ success: true, data: { date, available } });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/appointments?date=&status=
 * Admin — list bookings, optionally filtered
 */
export const getAppointments = async (req, res, next) => {
  try {
    const { date, status } = req.query;

    let sql = "SELECT * FROM appointments WHERE 1=1";
    const params = [];

    if (date) {
      sql += " AND appointment_date = ?";
      params.push(date);
    }
    if (status) {
      sql += " AND status = ?";
      params.push(status);
    }

    sql += " ORDER BY appointment_date DESC, appointment_time ASC";

    const [rows] = await pool.query(sql, params);

    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/appointments/:id
 */
export const getAppointmentById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/appointments/:id/status
 */
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const [result] = await pool.query(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.json({ success: true, message: `Appointment marked as ${status}.` });
  } catch (error) {
    next(error);
  }
};