import "dotenv/config";
import app from "./app.js";
import { testConnection } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await testConnection();
    console.log("✅ MySQL connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

start();