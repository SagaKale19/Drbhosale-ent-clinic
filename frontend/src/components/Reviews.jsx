import "./Reviews.css";

// Update these from the clinic's Google listing
const GOOGLE = {
  rating: 4.9,
  count: 120,
  url: "https://www.google.com/maps/place/Dr.Pravin+Bhosale+(E.N.T)/@18.4924322,73.9002412,17z",
};

export default function Reviews() {
  const full = Math.floor(GOOGLE.rating);
  const hasHalf = GOOGLE.rating - full >= 0.5;

  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="reviews-box">
          <div className="reviews-rating">
            <div className="rating-number">{GOOGLE.rating.toFixed(1)}</div>
            <div className="stars" aria-label={`${GOOGLE.rating} out of 5`}>
              {"★".repeat(full)}
              {hasHalf && <span className="star-half">★</span>}
              <span className="star-dim">{"★".repeat(5 - full - (hasHalf ? 1 : 0))}</span>
            </div>
            <p className="rating-count">{GOOGLE.count}+ reviews on Google</p>
          </div>

          <div className="reviews-text">
            <h2>Trusted by patients</h2>
            <p>
              Patients consistently mention Dr. Bhosale's careful approach and
              clear explanations. Read what they have written on Google.
            </p>
            <a
              href={GOOGLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-clinic"
            >
              Read reviews on Google ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}