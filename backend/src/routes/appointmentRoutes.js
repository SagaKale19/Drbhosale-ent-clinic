import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createAppointment,
  getAvailability,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import {
  createAppointmentRules,
  availabilityRules,
  idParamRules,
  statusRules,
} from "../middleware/validators/appointmentValidator.js";

const router = Router();

// Public
router.post("/", createAppointmentRules, createAppointment);
router.get("/availability", availabilityRules, getAvailability);

// Admin only
router.get("/", requireAuth, getAppointments);
router.get("/:id", requireAuth, idParamRules, getAppointmentById);
router.patch("/:id/status", requireAuth, statusRules, updateAppointmentStatus);

export default router;