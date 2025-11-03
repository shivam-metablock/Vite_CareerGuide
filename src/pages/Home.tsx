import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Crafting Your Future Career Path</h1>
          <p>
            Transform your educational journey with our trusted Career Guidance
            & Coaching Platform. Explore careers, calculate budgets, and get
            AI-powered guidance tailored to your goals.
          </p>
          <Link to="/class10" className="btn btn-primary">
            Let's Discuss
          </Link>
        </div>
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
          <source
            src="/bgVideo.webm"
            type="video/webm"
          />
        </video>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Careers Explored</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Coaching Centers</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Empower your success with comprehensive career guidance and
            educational planning solutions
          </p>
        </div>

        <div className="card-grid">
          <div className="card">
            <div className="card-icon">🎓</div>
            <h3>Class 10 Career Options</h3>
            <p>
              Explore different job options with detailed 20-year salary
              insights. Find the best coaching centers and nearby PG
              accommodations for your chosen career path.
            </p>
            <Link to="/class10" className="btn btn-primary">
              Explore Careers
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">📚</div>
            <h3>Stream Selection</h3>
            <p>
              Choose your perfect stream (Science, Commerce, or Arts) and
              discover career options with comprehensive insights, salary
              projections, and coaching recommendations.
            </p>
            <Link to="/stream" className="btn btn-primary">
              Choose Stream
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">💰</div>
            <h3>Budget Calculator</h3>
            <p>
              Calculate your budget for college, PG, or both. Get smart
              recommendations that fit within your budget based on location and
              preferences.
            </p>
            <Link to="/budget" className="btn btn-primary">
              Calculate Budget
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">🤖</div>
            <h3>AI Career Guidance</h3>
            <p>
              Get AI-based personalized career guidance tailored to your
              interests, strengths, and goals. Receive recommendations for
              stream, college, coaching, and PG options.
            </p>
            <Link to="/ai" className="btn btn-primary">
              Get AI Guidance
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ background: "#f8f9fa", padding: "4rem 2rem" }}>
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us as Your Career Partner?</h2>
            <p>
              We provide comprehensive, data-driven solutions for your
              educational and career journey
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-icon">🎯</div>
              <h3>Expertise Across Industries</h3>
              <p>
                Our team brings extensive experience across diverse industries,
                ensuring tailored solutions that meet your unique career
                challenges and goals.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">🚀</div>
              <h3>Cutting-Edge Technology</h3>
              <p>
                Stay ahead with our AI-powered guidance system that leverages
                the latest advancements to provide accurate career
                recommendations.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">✨</div>
              <h3>Customized Approach</h3>
              <p>
                Every student is unique. We work closely with you to understand
                your specific needs and provide solutions aligned with your
                long-term success.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">📊</div>
              <h3>Data-Driven Insights</h3>
              <p>
                Get 20-year salary projections and career growth insights based
                on real industry data to make informed decisions about your
                future.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">🤝</div>
              <h3>Collaborative Partnership</h3>
              <p>
                We believe in building lasting relationships. Your success is
                our success, and we support you at every stage of your career
                journey.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">🔒</div>
              <h3>Comprehensive Support</h3>
              <p>
                From career exploration to finding coaching centers and PG
                accommodations, we provide end-to-end support for your
                educational needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
