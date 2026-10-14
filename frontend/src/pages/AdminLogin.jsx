import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/appointments.js";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Skip the form.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await login(form);
      const { token, admin } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("adminName", admin.name);

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        setError("Invalid email or password.");
      } else if (status === 429) {
        setError(err.response.data.message || "Too many attempts. Please wait and try again.");
      } else if (status === 400) {
        setError("Please enter a valid email and password.");
      } else {
        setError("Could not reach the server. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="login-head">
            <span className="login-mark">ENT</span>
            <h1>Clinic Login</h1>
            <p>Dr. Pravin Bhosale — appointment management</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="form-alert">{error}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary-clinic w-100 mt-2"
              disabled={submitting}
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="login-note">
            This area is for clinic staff only.
          </p>
        </div>
      </div>
    </section>
  );
}