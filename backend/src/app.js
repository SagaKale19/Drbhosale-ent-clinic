import express from "express";
import helmet from "helmet";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();


app.use(helmet());
// ---------- Global middleware ----------
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json({ limit: "10kb" }));

// ---------- Routes ----------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Dr. Bhosale Clinic API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);


// ---------- Fallbacks (always last, in this order) ----------
app.use(notFound);
app.use(errorHandler);

export default app;