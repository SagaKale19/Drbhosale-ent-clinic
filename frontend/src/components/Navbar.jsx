import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top clinic-nav">
      <div className="container">
        <Link to="/" className="navbar-brand clinic-brand" onClick={close}>
          <span className="brand-mark">ENT</span>
          <span className="brand-text">
            Dr. Pravin Bhosale
            <small>ENT Specialist</small>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={close} end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" onClick={close}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link" onClick={close}>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" onClick={close}>Contact</NavLink>
            </li>
            <li className="nav-item ms-lg-3">
              <Link to="/book" className="btn btn-book" onClick={close}>
                Book Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}