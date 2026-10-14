import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Session expired. Please log in again."
        : "Invalid token.";

    return res.status(401).json({ success: false, message });
  }
}