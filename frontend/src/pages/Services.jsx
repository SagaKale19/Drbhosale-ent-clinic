import { Link } from "react-router-dom";
import "./Services.css";

const CATEGORIES = [
  {
    area: "Ear",
    intro: "Conditions affecting hearing, balance and the ear canal.",
    items: [
      "Ear infections (outer and middle ear)",
      "Hearing loss assessment",
      "Tinnitus (ringing in the ears)",
      "Vertigo and balance problems",
      "Ear wax removal",
      "Perforated eardrum",
    ],
  },
  {
    area: "Nose & Sinus",
    intro: "Breathing, smell and sinus-related complaints.",
    items: [
      "Sinusitis (acute and chronic)",
      "Nasal blockage and congestion",
      "Allergic rhinitis",
      "Deviated nasal septum",
      "Nasal polyps",
      "Recurrent nosebleeds",
    ],
  },
  {
    area: "Throat & Voice",
    intro: "Swallowing, speech and upper airway conditions.",
    items: [
      "Tonsillitis and adenoid problems",
      "Sore throat and pharyngitis",
      "Hoarseness and voice change",
      "Difficulty swallowing",
      "Chronic snoring",
      "Acid reflux affecting the throat",
    ],
  },
];

const CONSULTATION_TYPES = [
  {
    title: "In-person consultation",
    text: "A full examination at the clinic, including the physical checks that ENT diagnosis often requires.",
    best: "Best for new complaints, examinations and procedures.",
  },
  {
    title: "Phone consultation",
    text: "A scheduled call to discuss your condition, review test results or follow up after a visit.",
    best: "Best for follow-ups, report reviews and simple queries.",
  },
];

export default function Services() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Services</h1>
          <p>Diagnosis and treatment across the full range of ENT conditions</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row gy-4">
            {CATEGORIES.map((cat) => (
              <div className="col-lg-4" key={cat.area}>
                <div className="category-card">
                  <h3>{cat.area}</h3>
                  <p className="category-intro">{cat.intro}</p>
                  <ul className="category-list">
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="services-note">
            This list covers common conditions and is not exhaustive. If your
            concern is not listed, book a consultation and it can be assessed.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Two ways to consult</h2>
            <p className="text-muted">Choose whichever suits your situation.</p>
          </div>

          <div className="row gy-4 justify-content-center">
            {CONSULTATION_TYPES.map((type) => (
              <div className="col-md-6 col-lg-5" key={type.title}>
                <div className="consult-card">
                  <h4>{type.title}</h4>
                  <p>{type.text}</p>
                  <div className="consult-best">{type.best}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/book" className="btn btn-primary-clinic">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}