import '../App.css';

interface CoachingCardProps {
  coaching: {
    id: string;
    name: string;
    description?: string;
    city: string;
    state: string;
    phone?: string;
  };
  onClick: () => void;
}

function CoachingCard({ coaching, onClick }: CoachingCardProps) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-icon">🎓</div>
      <h4 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '700' }}>{coaching.name}</h4>
      {coaching.description && (
        <p style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>{coaching.description}</p>
      )}
      <p style={{ marginBottom: '0.75rem' }}>{coaching.city}, {coaching.state}</p>
      {coaching.phone && <p style={{ marginBottom: '1rem' }}>📞 {coaching.phone}</p>}
      <button className="btn btn-primary">View Details</button>
    </div>
  );
}

export default CoachingCard;

