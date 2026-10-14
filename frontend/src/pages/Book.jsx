import { useState, useEffect } from "react";
import { createAppointment, getAvailability } from "../api/appointments.js";
import "./Book.css";

const EMPTY_FORM = {
  patient_name: "",
  patient_phone: "",
  patient_email: "",
  patient_age: "",
  consultation_type: "in_person",
  reason: "",
  appointment_date: "",
  appointment_time: "",
};

const today = new Date().toISOString().split("T")[0];

function formatSlot(time) {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${suffix}`;
}

export default function Book() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [slots, setSlots] = useState([]);
  const [slotNote, setSlotNote] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(null);

  // Load available slots whenever the chosen date changes
  useEffect(() => {
    const date = form.appointment_date;
    let cancelled = false;

    async function loadSlots() {
      if (!date) {
        setSlots([]);
        setSlotNote("");
        return;
      }

      setLoadingSlots(true);
      setSlotNote("");

      try {
        const res = await getAvailability(date);
        if (cancelled) return;
        setSlots(res.data.data.available || []);
        setSlotNote(res.data.data.note || "");
      } catch {
        if (!cancelled) {
          setSlots([]);
          setSlotNote("Could not load available times. Please try again.");
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }

    loadSlots();
    return () => { cancelled = true; };
  }, [form.appointment_date]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "appointment_date" ? { appointment_time: "" } : {}),
    }));

    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");
    setSubmitting(true);

    try {
      const payload = { ...form };
      if (!payload.patient_email) delete payload.patient_email;
      if (!payload.patient_age) delete payload.patient_age;
      if (!payload.reason) delete payload.reason;

      await createAppointment(payload);

      setSuccess({
        date: form.appointment_date,
        time: form.appointment_time,
        type: form.consultation_type,
      });
      setForm(EMPTY_FORM);
    } catch (error) {
      const res = error.response;

      if (res?.status === 400 && Array.isArray(res.data?.errors)) {
        const mapped = {};
        res.data.errors.forEach((err) => { mapped[err.field] = err.message; });
        setFieldErrors(mapped);
        setFormError("Please correct the highlighted fields.");
      } else if (res?.status === 409) {
        setFormError(res.data.message);
        setForm((prev) => ({ ...prev, appointment_time: "" }));
        try {
          const refresh = await getAvailability(form.appointment_date);
          setSlots(refresh.data.data.available || []);
        } catch {
          // keep the existing slot list if the refresh fails
        }
      } else if (res?.status === 429) {
        setFormError(res.data.message || "Too many requests. Please try again later.");
      } else {
        setFormError(res?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="section">
        <div className="container">
          <div className="booking-success">
            <div className="success-mark">✓</div>
            <h2>Appointment requested</h2>
            <p>
              Your request for <strong>{success.date}</strong> at{" "}
              <strong>{formatSlot(success.time)}</strong> (
              {success.type === "phone" ? "phone consultation" : "in person"})
              has been received.
            </p>
            <p className="text-muted">
              The clinic will confirm shortly. Please keep your phone available.
            </p>
            <button className="btn btn-ghost-clinic" onClick={() => setSuccess(null)}>
              Book another appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Choose a time that suits you — in person or by phone</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form className="booking-form" onSubmit={handleSubmit} noValidate>

                {formError && <div className="form-alert">{formError}</div>}

                <h3 className="form-section-title">Your details</h3>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="patient_name">
                      Full name <span className="req">*</span>
                    </label>
                    <input
                      id="patient_name"
                      name="patient_name"
                      type="text"
                      className={`form-control ${fieldErrors.patient_name ? "is-invalid" : ""}`}
                      value={form.patient_name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                    />
                    {fieldErrors.patient_name && (
                      <div className="field-error">{fieldErrors.patient_name}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="patient_phone">
                      Phone number <span className="req">*</span>
                    </label>
                    <input
                      id="patient_phone"
                      name="patient_phone"
                      type="tel"
                      className={`form-control ${fieldErrors.patient_phone ? "is-invalid" : ""}`}
                      value={form.patient_phone}
                      onChange={handleChange}
                      placeholder="e.g. 98765 43210"
                    />
                    {fieldErrors.patient_phone && (
                      <div className="field-error">{fieldErrors.patient_phone}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="patient_email">
                      Email <span className="optional">(optional)</span>
                    </label>
                    <input
                      id="patient_email"
                      name="patient_email"
                      type="email"
                      className={`form-control ${fieldErrors.patient_email ? "is-invalid" : ""}`}
                      value={form.patient_email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                    {fieldErrors.patient_email && (
                      <div className="field-error">{fieldErrors.patient_email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" htmlFor="patient_age">
                      Age <span className="optional">(optional)</span>
                    </label>
                    <input
                      id="patient_age"
                      name="patient_age"
                      type="number"
                      min="0"
                      max="120"
                      className={`form-control ${fieldErrors.patient_age ? "is-invalid" : ""}`}
                      value={form.patient_age}
                      onChange={handleChange}
                    />
                    {fieldErrors.patient_age && (
                      <div className="field-error">{fieldErrors.patient_age}</div>
                    )}
                  </div>
                </div>

                <h3 className="form-section-title mt-4">Consultation</h3>

                <div className="consult-choice">
                  <label className={form.consultation_type === "in_person" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="consultation_type"
                      value="in_person"
                      checked={form.consultation_type === "in_person"}
                      onChange={handleChange}
                    />
                    <span className="choice-title">In person</span>
                    <span className="choice-text">Visit the clinic for examination</span>
                  </label>

                  <label className={form.consultation_type === "phone" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="consultation_type"
                      value="phone"
                      checked={form.consultation_type === "phone"}
                      onChange={handleChange}
                    />
                    <span className="choice-title">Phone call</span>
                    <span className="choice-text">The clinic calls you at the slot</span>
                  </label>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="appointment_date">
                      Date <span className="req">*</span>
                    </label>
                    <input
                      id="appointment_date"
                      name="appointment_date"
                      type="date"
                      min={today}
                      className={`form-control ${fieldErrors.appointment_date ? "is-invalid" : ""}`}
                      value={form.appointment_date}
                      onChange={handleChange}
                    />
                    {fieldErrors.appointment_date && (
                      <div className="field-error">{fieldErrors.appointment_date}</div>
                    )}
                  </div>
                </div>

                {form.appointment_date && (
                  <div className="slots-block">
                    <label className="form-label">
                      Available times <span className="req">*</span>
                    </label>

                    {loadingSlots && <p className="slots-message">Loading available times…</p>}

                    {!loadingSlots && slotNote && (
                      <p className="slots-message slots-closed">{slotNote}</p>
                    )}

                    {!loadingSlots && !slotNote && slots.length === 0 && (
                      <p className="slots-message slots-closed">
                        No times available on this date. Please choose another day.
                      </p>
                    )}

                    {!loadingSlots && slots.length > 0 && (
                      <div className="slot-grid">
                        {slots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            className={`slot ${form.appointment_time === slot ? "selected" : ""}`}
                            onClick={() =>
                              setForm((prev) => ({ ...prev, appointment_time: slot }))
                            }
                          >
                            {formatSlot(slot)}
                          </button>
                        ))}
                      </div>
                    )}

                    {fieldErrors.appointment_time && (
                      <div className="field-error">{fieldErrors.appointment_time}</div>
                    )}
                  </div>
                )}

                <div className="mt-4">
                  <label className="form-label" htmlFor="reason">
                    Reason for visit <span className="optional">(optional)</span>
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="3"
                    className={`form-control ${fieldErrors.reason ? "is-invalid" : ""}`}
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="Briefly describe your symptoms"
                  />
                  {fieldErrors.reason && (
                    <div className="field-error">{fieldErrors.reason}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-clinic w-100 mt-4"
                  disabled={submitting || !form.appointment_time}
                >
                  {submitting ? "Booking…" : "Request Appointment"}
                </button>

                <p className="form-footnote">
                  Your appointment is confirmed by the clinic. In an emergency,
                  call your local emergency number instead of booking online.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}