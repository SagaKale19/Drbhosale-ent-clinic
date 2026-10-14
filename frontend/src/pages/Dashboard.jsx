import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments, updateStatus } from "../api/appointments.js";
import "./Dashboard.css";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const today = new Date().toISOString().split("T")[0];

function formatTime(time) {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 === 0 ? 12 : hour % 12}:${m} ${suffix}`;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const adminName = localStorage.getItem("adminName") || "Clinic";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const params = {};
        if (dateFilter) params.date = dateFilter;
        if (statusFilter) params.status = statusFilter;

        const res = await getAppointments(params);
        if (!cancelled) setAppointments(res.data.data || []);
      } catch (err) {
        if (!cancelled && err.response?.status !== 401) {
          setError("Could not load appointments. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [dateFilter, statusFilter, refreshKey]);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    try {
      await updateStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch {
      setError("Could not update that appointment.");
    } finally {
      setUpdatingId(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    navigate("/admin/login", { replace: true });
  }

  const counts = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
  };

  return (
    <section className="dashboard">
      <div className="container">

        <div className="dash-head">
          <div>
            <h1>Appointments</h1>
            <p className="text-muted">Signed in as {adminName}</p>
          </div>
          <div className="dash-head-actions">
            <button
              className="btn btn-ghost-clinic btn-sm"
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              Refresh
            </button>
            <button className="btn btn-ghost-clinic btn-sm" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>

        <div className="dash-stats">
          <div className="stat"><span>{counts.total}</span>Showing</div>
          <div className="stat"><span>{counts.pending}</span>Pending</div>
          <div className="stat"><span>{counts.confirmed}</span>Confirmed</div>
        </div>

        <div className="dash-filters">
          <div>
            <label className="form-label" htmlFor="dateFilter">Date</label>
            <input
              id="dateFilter"
              type="date"
              className="form-control"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <label className="form-label">Status</label>
            <div>
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`chip ${statusFilter === f.value ? "active" : ""}`}
                  onClick={() => setStatusFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-actions">
            <button
              className="btn btn-ghost-clinic btn-sm"
              onClick={() => { setDateFilter(today); setStatusFilter(""); }}
            >
              Today
            </button>
            <button
              className="btn btn-ghost-clinic btn-sm"
              onClick={() => { setDateFilter(""); setStatusFilter(""); }}
            >
              Clear
            </button>
          </div>
        </div>

        {error && <div className="form-alert">{error}</div>}

        {loading ? (
          <p className="dash-message">Loading appointments…</p>
        ) : appointments.length === 0 ? (
          <p className="dash-message">No appointments match these filters.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="cell-date">{formatDate(a.appointment_date)}</div>
                      <div className="cell-sub">{formatTime(a.appointment_time)}</div>
                    </td>
                    <td>
                      <div className="cell-name">{a.patient_name}</div>
                      {a.patient_age && <div className="cell-sub">{a.patient_age} yrs</div>}
                    </td>
                    <td>
                      <a href={`tel:${a.patient_phone}`} className="cell-link">
                        {a.patient_phone}
                      </a>
                      {a.patient_email && <div className="cell-sub">{a.patient_email}</div>}
                    </td>
                    <td>
                      <span className={`type-tag ${a.consultation_type}`}>
                        {a.consultation_type === "phone" ? "Phone" : "In person"}
                      </span>
                    </td>
                    <td className="cell-reason">{a.reason || "—"}</td>
                    <td>
                      <span className={`status-badge ${a.status}`}>{a.status}</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        {a.status === "pending" && (
                          <button
                            className="action confirm"
                            disabled={updatingId === a.id}
                            onClick={() => handleStatusChange(a.id, "confirmed")}
                          >
                            Confirm
                          </button>
                        )}
                        {(a.status === "pending" || a.status === "confirmed") && (
                          <>
                            <button
                              className="action complete"
                              disabled={updatingId === a.id}
                              onClick={() => handleStatusChange(a.id, "completed")}
                            >
                              Complete
                            </button>
                            <button
                              className="action cancel"
                              disabled={updatingId === a.id}
                              onClick={() => handleStatusChange(a.id, "cancelled")}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}