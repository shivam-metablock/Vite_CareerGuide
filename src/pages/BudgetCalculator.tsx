import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateBudget } from '../api/api';
import '../App.css';

function BudgetCalculator() {
  const [budgetType, setBudgetType] = useState<'College' | 'PG' | 'Both'>('Both');
  const [totalBudget, setTotalBudget] = useState<string>('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await calculateBudget({
        budgetType,
        totalBudget: parseFloat(totalBudget),
        city: city || undefined,
        state: state || undefined,
      });
      setResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to calculate budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero" style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem' }}>Budget Calculator</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Calculate your budget for College, PG, or Both. Get smart recommendations within your budget.
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
              <label>What do you want to calculate budget for?</label>
              <select value={budgetType} onChange={(e) => setBudgetType(e.target.value as any)}>
                <option value="College">College Only</option>
                <option value="PG">PG Only</option>
                <option value="Both">Both College and PG</option>
              </select>
            </div>

            <div className="input-group">
              <label>Total Budget (₹)</label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                placeholder="Enter your total budget"
                required
              />
            </div>

            <div className="input-group">
              <label>City (Optional)</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
              />
            </div>

            <div className="input-group">
              <label>State (Optional)</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state name"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Budget'}
            </button>
          </form>
        </div>

        {error && <div className="error">{error}</div>}

        {results && (
          <div style={{ marginTop: '2rem' }}>
            {results.colleges && results.colleges.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Colleges Within Budget</h2>
                <div className="card-grid">
                  {results.colleges.map((college: any) => (
                    <div key={college.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{college.name}</h3>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {college.city}, {college.state}</p>
                      {college.fees && <p style={{ marginBottom: '0.5rem' }}><strong>Annual Fees:</strong> ₹{college.fees.toLocaleString()}</p>}
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

            {results.pgs && results.pgs.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>PG Options Within Budget</h2>
                <div className="card-grid">
                  {results.pgs.map((pg: any) => (
                    <div key={pg.id} className="card">
                      <h3 style={{ marginBottom: '0.75rem' }}>{pg.name}</h3>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> {pg.address}, {pg.city}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Monthly Rent:</strong> ₹{pg.monthlyRent.toLocaleString()}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Annual Cost:</strong> ₹{(pg.monthlyRent * 12).toLocaleString()}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Owner:</strong> {pg.ownerName}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Contact:</strong> {pg.ownerPhone}</p>
                      {pg.amenities && pg.amenities.length > 0 && (
                        <p><strong>Amenities:</strong> {pg.amenities.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.recommendations && results.recommendations.length > 0 && (
              <div>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Best College + PG Combinations</h2>
                <div className="card-grid">
                  {results.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="card">
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>
                        Option {index + 1}
                      </h3>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>College:</h4>
                        <p style={{ marginBottom: '0.5rem' }}><strong>{rec.college.name}</strong></p>
                        <p style={{ marginBottom: '0.5rem' }}>{rec.college.city}, {rec.college.state}</p>
                        {rec.college.fees && <p>Fees: ₹{rec.college.fees.toLocaleString()}/year</p>}
                      </div>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>PG:</h4>
                        <p style={{ marginBottom: '0.5rem' }}><strong>{rec.pg.name}</strong></p>
                        <p style={{ marginBottom: '0.5rem' }}>Rent: ₹{rec.pg.monthlyRent.toLocaleString()}/month</p>
                        <p>Annual: ₹{(rec.pg.monthlyRent * 12).toLocaleString()}</p>
                      </div>
                      <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '12px', color: 'white' }}>
                        <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>Total Annual Cost: ₹{rec.totalCost.toLocaleString()}</p>
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

export default BudgetCalculator;

