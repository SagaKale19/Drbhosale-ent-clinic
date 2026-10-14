import { Link } from "react-router-dom";
import "./About.css";

const CREDENTIALS = [
  { title: "MBBS", text: "Bachelor of Medicine and Bachelor of Surgery" },
  { title: "MS (ENT)", text: "Master of Surgery in Ear, Nose and Throat" },
  { title: "26 Years", text: "Dedicated practice in ENT medicine" },
];

const APPROACH = [
  {
    title: "Thorough diagnosis",
    text: "Time taken to understand the full history before reaching a conclusion, rather than treating symptoms in isolation.",
  },
  {
    title: "Clear explanations",
    text: "Conditions explained in plain language, so you understand what is happening and why a treatment is being recommended.",
  },
  {
    title: "Conservative first",
    text: "Medical management is explored before surgical options wherever the condition allows for it.",
  },
  {
    title: "Accessible consultation",
    text: "Phone consultations for follow-ups and straightforward queries, so a clinic visit is not always necessary.",
  },
];

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About Dr. Pravin Bhosale</h1>
          <p>ENT Specialist · MBBS, MS (ENT) · 26 years of practice</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row gy-5 align-items-start">

            <div className="col-lg-7">
              <h2>A specialist in ear, nose and throat medicine</h2>
              <p className="about-lead">
                Dr. Pravin Bhosale is a highly experienced ENT specialist with 26
                years of dedicated practice in the field.
              </p>
              <p>
                He holds a Bachelor of Medicine and Bachelor of Surgery (MBBS),
                followed by a Master of Surgery (MS) in Ear, Nose and Throat.
                Over more than two decades of practice, he has developed a
                comprehensive understanding of ENT disorders and is skilled in
                diagnosing and treating a wide range of conditions affecting the
                ear, nose and throat.
              </p>
              <p>
                His practice covers everything from common infections and
                allergies through to hearing difficulties, chronic sinus
                problems and voice disorders. Patients are seen both in person
                at the clinic and over the phone, depending on what the
                consultation requires.
              </p>

              <Link to="/book" className="btn btn-primary-clinic mt-3">
                Book an Appointment
              </Link>
            </div>

            <div className="col-lg-5">
              <div className="credentials-card">
                <h3>Qualifications</h3>
                {CREDENTIALS.map((item) => (
                  <div className="credential" key={item.title}>
                    <div className="credential-title">{item.title}</div>
                    <div className="credential-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>How the clinic works</h2>
            <p className="text-muted">
              What you can expect from a consultation.
            </p>
          </div>

          <div className="row gy-4">
            {APPROACH.map((item) => (
              <div className="col-md-6" key={item.title}>
                <div className="approach-card">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}