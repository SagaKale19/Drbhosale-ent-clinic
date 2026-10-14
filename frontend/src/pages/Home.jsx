import { Link } from "react-router-dom";
import "./Home.css";
import Reviews from "../components/Reviews.jsx";

const HIGHLIGHTS = [
  { value: "26+", label: "Years of practice" },
  { value: "MBBS, MS", label: "ENT qualified" },
  { value: "2", label: "Consultation modes" },
];

const SERVICES = [
  {
    title: "Ear Care",
    text: "Hearing loss, ear infections, tinnitus, vertigo and wax removal.",
  },
  {
    title: "Nose & Sinus",
    text: "Sinusitis, nasal blockage, allergic rhinitis and deviated septum.",
  },
  {
    title: "Throat & Voice",
    text: "Tonsillitis, hoarseness, swallowing difficulty and chronic snoring.",
  },
];

const STEPS = [
  { n: "1", title: "Pick a slot", text: "Choose a date and an available time." },
  { n: "2", title: "Share details", text: "Tell us your symptoms in a line or two." },
  { n: "3", title: "Get confirmed", text: "The clinic confirms your appointment." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="hero-badge">ENT Specialist · 26 Years of Experience</span>
              <h1 className="hero-title">
                Expert care for your <span>ear, nose and throat</span>
              </h1>
              <p className="hero-text">
                Dr. Pravin Bhosale offers thorough diagnosis and clear, honest
                guidance for ENT conditions — in person at the clinic or over a
                phone consultation.
              </p>
              <div className="hero-actions">
                <Link to="/book" className="btn btn-primary-clinic">Book an Appointment</Link>
                <Link to="/services" className="btn btn-ghost-clinic">View Services</Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-card">
                <h3>Clinic Hours</h3>
                <ul>
                  <li><span>Monday – Saturday</span><span>10:00 – 12:30</span></li>
                  <li><span></span><span>17:00 – 19:30</span></li>
                  <li className="closed"><span>Sunday</span><span>Closed</span></li>
                </ul>
                <p className="hero-card-note">
                  Phone consultations available in the same slots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights">
        <div className="container">
          <div className="row text-center gy-3">
            {HIGHLIGHTS.map((item) => (
              <div className="col-md-4" key={item.label}>
                <div className="highlight-value">{item.value}</div>
                <div className="highlight-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What we treat</h2>
            <p className="text-muted">
              Comprehensive care across the full range of ENT conditions.
            </p>
          </div>

          <div className="row gy-4">
            {SERVICES.map((service) => (
              <div className="col-md-4" key={service.title}>
                <div className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-ghost-clinic">See all services</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Booking takes a minute</h2>
          </div>

          <div className="row gy-4">
            {STEPS.map((step) => (
              <div className="col-md-4" key={step.n}>
                <div className="step">
                  <div className="step-number">{step.n}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews></Reviews>

      {/* CTA */}
      <section className="cta">
        <div className="container text-center">
          <h2>Ready to see a specialist?</h2>
          <p>Choose a time that suits you — in person or by phone.</p>
          <Link to="/book" className="btn btn-light-clinic">Book an Appointment</Link>
        </div>
      </section>
    </>
  );
}