import { Router } from "express";
import { body } from "express-validator";
import { login, getMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { handleValidation } from "../middleware/validators/appointmentValidator.js";

const router = Router();

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email required.").normalizeEmail(),
    body("password").notEmpty().withMessage("Password required."),
    handleValidation,
  ],
  login
);

router.get("/me", requireAuth, getMe);

export default router;