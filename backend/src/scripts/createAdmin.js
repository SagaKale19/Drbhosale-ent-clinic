import "dotenv/config";
import bcrypt from "bcrypt";
import readline from "node:readline/promises";
import pool from "../config/db.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const name = await rl.question("Name: ");
const email = await rl.question("Email: ");
const password = await rl.question("Password: ");
rl.close();

if (password.length < 10) {
  console.error("❌ Password must be at least 10 characters.");
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

await pool.query(
  "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)",
  [name, email, passwordHash]
);

console.log(`✅ Admin created: ${email}`);
process.exit(0);