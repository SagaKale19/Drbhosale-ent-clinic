import { body, query, param, validationResult } from "express-validator";

/**
 * Runs after the rules — collects any failures into a 400 response.
 */
export function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}

export const createAppointmentRules = [
  body("patient_name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2–100 characters.")
    .escape(),

  body("patient_phone")
    .trim()
    .notEmpty().withMessage("Phone number is required.")
    .matches(/^[0-9+\-\s()]{7,20}$/).withMessage("Enter a valid phone number."),

  body("patient_email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail().withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("patient_age")
    .optional({ values: "falsy" })
    .isInt({ min: 0, max: 120 }).withMessage("Age must be between 0 and 120.")
    .toInt(),

  body("consultation_type")
    .notEmpty().withMessage("Consultation type is required.")
    .isIn(["in_person", "phone"]).withMessage("Type must be in_person or phone."),

  body("reason")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 1000 }).withMessage("Reason must be under 1000 characters.")
    .escape(),

  body("appointment_date")
    .notEmpty().withMessage("Date is required.")
    .isISO8601().withMessage("Date must be in YYYY-MM-DD format.")
    .custom((value) => {
      const today = new Date().toISOString().split("T")[0];
      if (value < today) throw new Error("Date cannot be in the past.");
      return true;
    }),

  body("appointment_time")
    .notEmpty().withMessage("Time is required.")
    .matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).withMessage("Time must be HH:MM:SS."),

  handleValidation,
];

export const availabilityRules = [
  query("date")
    .notEmpty().withMessage("A date is required.")
    .isISO8601().withMessage("Date must be in YYYY-MM-DD format."),
  handleValidation,
];

export const idParamRules = [
  param("id").isInt({ min: 1 }).withMessage("Invalid appointment id."),
  handleValidation,
];

export const statusRules = [
  param("id").isInt({ min: 1 }).withMessage("Invalid appointment id."),
  body("status")
    .isIn(["pending", "confirmed", "cancelled", "completed"])
    .withMessage("Invalid status value."),
  handleValidation,
];