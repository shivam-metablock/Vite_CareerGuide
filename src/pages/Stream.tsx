import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStreamDetails, getStreamCareers, getCoachingForCareer, getCoachingDetails, getNearbyPGs } from '../api/api';
import SalaryChart from '../components/SalaryChart';
import CoachingCard from '../components/CoachingCard';
import '../App.css';

const STREAMS = ['Science', 'Commerce', 'Arts'];

function Stream() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [streamInfo, setStreamInfo] = useState<any>(null);
  const [careers, setCareers] = useState<any[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<any | null>(null);
  const [coaching, setCoaching] = useState<any[]>([]);
  const [selectedCoaching, setSelectedCoaching] = useState<any | null>(null);
  const [pgs, setPGs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStreamSelect = async (stream: string) => {
    setSelectedStream(stream);
    setSelectedCareer(null);
    setCoaching([]);
    setSelectedCoaching(null);
    setPGs([]);
    
    try {
      setLoading(true);
      const [streamResponse, careersResponse] = await Promise.all([
        getStreamDetails(stream),
        getStreamCareers(stream),
      ]);
      setStreamInfo(streamResponse.data);
      setCareers(careersResponse.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch stream details');
    } finally {
      setLoading(false);
    }
  };

  const handleCareerSelect = async (career: any) => {
    setSelectedCareer(career);
    setSelectedCoaching(null);
    setPGs([]);
    try {
      const response = await getCoachingForCareer(career.id);
      setCoaching(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch coaching');
    }
  };

  const handleCoachingSelect = async (coachingId: string) => {
    try {
      const response = await getCoachingDetails(coachingId);
      setSelectedCoaching(response.data);
      
      const pgResponse = await getNearbyPGs(coachingId);
      setPGs(pgResponse.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch coaching details');
    }
  };

  return (
    <>
      <section className="hero" style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem' }}>Choose Your Stream</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Select your stream and explore career options with detailed insights and guidance
          </p>
        </div>
      </section>

      <div className="container">
        <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem', marginTop: '2rem' }}>
          ← Back to Home
        </Link>

        {!selectedStream ? (
          <div className="card-grid">
            {STREAMS.map((stream) => (
              <div key={stream} className="card" onClick={() => handleStreamSelect(stream)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div className="card-icon">📖</div>
                <h2 style={{ marginBottom: '1rem' }}>{stream}</h2>
                <button className="btn btn-primary">Select Stream</button>
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setSelectedStream(null);
                setSelectedCareer(null);
                setCoaching([]);
                setSelectedCoaching(null);
                setPGs([]);
              }}
              style={{ marginBottom: '1rem' }}
            >
              ← Back to Streams
            </button>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{streamInfo?.stream}</h2>
              <p style={{ fontSize: '1.1rem' }}>{streamInfo?.description}</p>
            </div>

            {!selectedCareer ? (
              <>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '700' }}>Career Options in {selectedStream}</h2>
                <div className="card-grid">
                  {careers.map((career) => (
                    <div key={career.id} className="card" onClick={() => handleCareerSelect(career)} style={{ cursor: 'pointer' }}>
                      <div className="card-icon">💼</div>
                      <h3>{career.name}</h3>
                      <p>{career.description || 'Explore this career'}</p>
                      <button className="btn btn-primary">View Details</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setSelectedCareer(null);
                    setSelectedCoaching(null);
                    setPGs([]);
                  }}
                  style={{ marginBottom: '1rem' }}
                >
                  ← Back to Careers
                </button>
                <div className="card">
                  <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{selectedCareer.name}</h2>
                  {selectedCareer.description && (
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>{selectedCareer.description}</p>
                  )}
                  
                  {selectedCareer.salaryInsights && selectedCareer.salaryInsights.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>20-Year Salary Insights</h3>
                      <SalaryChart data={selectedCareer.salaryInsights} />
                    </div>
                  )}

                  {coaching.length > 0 && (
                    <div>
                      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Suggested Coaching Centers</h3>
                      <div className="card-grid">
                        {coaching.map((coach) => (
                          <CoachingCard
                            key={coach.id}
                            coaching={coach}
                            onClick={() => handleCoachingSelect(coach.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedCoaching && (
                  <div className="card" style={{ marginTop: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{selectedCoaching.name}</h2>
                    <div style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                      <p><strong>Address:</strong> {selectedCoaching.address}, {selectedCoaching.city}, {selectedCoaching.state}</p>
                      {selectedCoaching.phone && <p><strong>Phone:</strong> {selectedCoaching.phone}</p>}
                      {selectedCoaching.email && <p><strong>Email:</strong> {selectedCoaching.email}</p>}
                      {selectedCoaching.website && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a href={selectedCoaching.website} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981' }}>
                            {selectedCoaching.website}
                          </a>
                        </p>
                      )}
                    </div>

                    {selectedCoaching.salaryInsights && selectedCoaching.salaryInsights.length > 0 && (
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Salary Insights After Coaching</h3>
                        <SalaryChart data={selectedCoaching.salaryInsights} />
                      </div>
                    )}

                    {pgs.length > 0 && (
                      <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Nearby PG Options</h3>
                        <div className="card-grid">
                          {pgs.map((pg) => (
                            <div key={pg.id} className="card">
                              <h4 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '700' }}>{pg.name}</h4>
                              <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {pg.address}, {pg.city}</p>
                              <p style={{ marginBottom: '0.5rem' }}><strong>Monthly Rent:</strong> ₹{pg.monthlyRent.toLocaleString()}</p>
                              <p style={{ marginBottom: '0.5rem' }}><strong>Owner:</strong> {pg.ownerName}</p>
                              <p style={{ marginBottom: '0.5rem' }}><strong>Contact:</strong> {pg.ownerPhone}</p>
                              {pg.ownerEmail && <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {pg.ownerEmail}</p>}
                              {pg.amenities && pg.amenities.length > 0 && (
                                <p style={{ marginBottom: '0.5rem' }}><strong>Amenities:</strong> {pg.amenities.join(', ')}</p>
                              )}
                              {pg.distance && <p><strong>Distance:</strong> {pg.distance} km</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Stream;

