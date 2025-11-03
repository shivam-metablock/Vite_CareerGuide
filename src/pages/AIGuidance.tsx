import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAIGuidance } from '../api/api';
import SalaryChart from '../components/SalaryChart';
import '../App.css';

function AIGuidance() {
  const [interests, setInterests] = useState('');
  const [strengths, setStrengths] = useState('');
  const [goals, setGoals] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const interestsArray = interests.split(',').map((i) => i.trim()).filter(Boolean);
      const strengthsArray = strengths.split(',').map((s) => s.trim()).filter(Boolean);
      const goalsArray = goals.split(',').map((g) => g.trim()).filter(Boolean);

      const response = await getAIGuidance({
        interests: interestsArray,
        strengths: strengthsArray,
        goals: goalsArray,
        budget: budget ? parseFloat(budget) : undefined,
        location: location || undefined,
      });
      setResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to get AI guidance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero" style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem' }}>AI Career Guidance</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Get AI-based career guidance personalized for your interests, strengths, and goals.
          </p>
        </div>
      </section>

      <div className="container">
        <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          ← Back to Home
        </Link>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Your Interests (comma-separated)</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., technology, design, business, science"
                required
              />
            </div>

            <div className="input-group">
              <label>Your Strengths (comma-separated)</label>
              <input
                type="text"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="e.g., analytical thinking, creativity, communication"
                required
              />
            </div>

            <div className="input-group">
              <label>Your Goals (comma-separated)</label>
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g., high salary, work-life balance, make an impact"
                required
              />
            </div>

            <div className="input-group">
              <label>Budget (₹) - Optional</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your total budget"
              />
            </div>

            <div className="input-group">
              <label>Preferred Location - Optional</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Getting Recommendations...' : 'Get AI Guidance'}
            </button>
          </form>
        </div>

        {error && <div className="error">{error}</div>}

        {results && (
          <div style={{ marginTop: '2rem' }}>
            <div className="card" style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '2.5rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Recommended Stream: {results.recommendedStream}</h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.95 }}>
                Based on your interests, strengths, and goals, we recommend the {results.recommendedStream} stream.
              </p>
            </div>

            {results.careers && results.careers.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Recommended Careers</h2>
                <div className="card-grid">
                  {results.careers.map((career: any) => (
                    <div key={career.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{career.name}</h3>
                      {career.description && <p style={{ marginBottom: '1rem' }}>{career.description}</p>}
                      {career.salaryInsights && career.salaryInsights.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <SalaryChart data={career.salaryInsights} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.colleges && results.colleges.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Recommended Colleges</h2>
                <div className="card-grid">
                  {results.colleges.map((college: any) => (
                    <div key={college.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{college.name}</h3>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {college.city}, {college.state}</p>
                      {college.fees && <p style={{ marginBottom: '0.5rem' }}><strong>Fees:</strong> ₹{college.fees.toLocaleString()}/year</p>}
                      {college.courses && college.courses.length > 0 && (
                        <p style={{ marginBottom: '0.5rem' }}><strong>Courses:</strong> {college.courses.join(', ')}</p>
                      )}
                      {college.website && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a href={college.website} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981' }}>
                            Visit
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.coaching && results.coaching.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Recommended Coaching Centers</h2>
                <div className="card-grid">
                  {results.coaching.map((coach: any) => (
                    <div key={coach.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{coach.name}</h3>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {coach.city}, {coach.state}</p>
                      {coach.phone && <p><strong>Phone:</strong> {coach.phone}</p>}
                      {coach.website && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a href={coach.website} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981' }}>
                            Visit
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.pgs && results.pgs.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Recommended PG Options</h2>
                <div className="card-grid">
                  {results.pgs.map((pg: any) => (
                    <div key={pg.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{pg.name}</h3>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {pg.address}, {pg.city}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Monthly Rent:</strong> ₹{pg.monthlyRent.toLocaleString()}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Owner:</strong> {pg.ownerName}</p>
                      <p><strong>Contact:</strong> {pg.ownerPhone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.recommendations && results.recommendations.length > 0 && (
              <div>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Best Complete Packages</h2>
                <div className="card-grid">
                  {results.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="card">
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Package {index + 1}</h3>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>College: {rec.college.name}</h4>
                        <p style={{ marginBottom: '0.5rem' }}>{rec.college.city}, {rec.college.state}</p>
                      </div>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>PG: {rec.pg.name}</h4>
                        <p style={{ marginBottom: '0.5rem' }}>₹{rec.pg.monthlyRent.toLocaleString()}/month</p>
                      </div>
                      <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', color: 'white' }}>
                        <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>Total Cost: ₹{rec.totalCost.toLocaleString()}/year</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AIGuidance;

