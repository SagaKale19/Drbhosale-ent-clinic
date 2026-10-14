import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="clinic-footer">
      <div className="container">
        <div className="row gy-4">

          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title">Dr. Pravin Bhosale</h5>
            <p className="footer-sub">MBBS, MS (ENT)</p>
            <p className="footer-text">
              ENT Specialist with 26 years of practice, treating ear, nose and
              throat conditions with careful diagnosis and clear explanations.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/book">Book Appointment</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-heading">Clinic Hours</h6>
            <ul className="footer-hours">
              <li><span>Mon – Sat</span><span>10:00 – 12:30</span></li>
              <li><span></span><span>17:00 – 19:30</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Contact</h6>
            <ul className="footer-contact">
              <li>
                <a href="tel:+917757820537">+91 7757820537</a>
              </li>
              <li>
                <a href="mailto:clinic@drbhosale.com">clinic@drbhosale.com</a>
              </li>
              <li className="footer-address">
                Aishwarya Residency, Vitthal Rao Shivarkar Rd, opposite Ganpati Temple, Phase 1, Vikas Nagar, Wanwadi, Pune, Maharashtra 411040, India
              </li>
            </ul>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© {year} Dr. Pravin Bhosale. All rights reserved.</p>
          <Link to="/admin/login" className="admin-link">Clinic Login</Link>
        </div>
      </div>
    </footer>
  );
}