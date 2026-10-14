import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT id, name, email, password_hash FROM admins WHERE email = ?",
      [email]
    );

    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    res.json({
      success: true,
      data: {
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email FROM admins WHERE id = ?",
      [req.admin.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Account no longer exists." });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};