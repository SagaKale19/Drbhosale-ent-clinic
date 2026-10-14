import { Link } from "react-router-dom";
import "./Contact.css";

const CLINIC = {
  phone: "+91 7757820537",
  email: "clinic@drbhosale.com",
  addressLines: ["Aishwarya Residency, Vitthal Rao Shivarkar Rd, opposite Ganpati Temple, Phase 1, Vikas Nagar, Wanwadi, Pune, Maharashtra 411040, India"],
  mapQuery: "Dr Pravin Bhosale ENT Clinic",
};

const HOURS = [
  { day: "Monday – Saturday", time: "10:00 – 12:30, 17:00 – 19:30" },
  { day: "Sunday", time: "Closed", closed: true },
];

export default function Contact() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact the Clinic</h1>
          <p>Get in touch, or book an appointment online</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row gy-4">

            <div className="col-lg-4 col-md-6">
              <div className="contact-card">
                <h3>Phone</h3>
                <a href={CLINIC.phoneHref} className="contact-primary">
                  {CLINIC.phone}
                </a>
                <p>Available during clinic hours.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="contact-card">
                <h3>Email</h3>
                <a href={`mailto:${CLINIC.email}`} className="contact-primary">
                  {CLINIC.email}
                </a>
                <p>For general enquiries and reports.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="contact-card">
                <h3>Address</h3>
                <address className="contact-address">
                  {CLINIC.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="contact-card">
                <h3>Clinic Hours</h3>
                <ul className="contact-hours">
                  {HOURS.map((h) => (
                    <li key={h.day} className={h.closed ? "closed" : ""}>
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="contact-card contact-cta">
                <h3>Book online instead</h3>
                <p>
                  Choose a date and time that works for you, in person or by
                  phone. The clinic will confirm your appointment.
                </p>
                <Link to="/book" className="btn btn-primary-clinic">
                  Book an Appointment
                </Link>
              </div>
            </div>

          </div>

          <div className="emergency-note">
            <strong>In an emergency</strong>, do not use this website to book.
            Call your local emergency number or go to the nearest hospital.
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Clinic location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
          width="100%"
          height="380"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}