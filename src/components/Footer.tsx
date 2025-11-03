import { Link } from 'react-router-dom';
import '../App.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p style={{ color: '#ccc', lineHeight: '1.7' }}>
            Your trusted partner in career guidance and educational planning. 
            We help students make informed decisions about their future.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/class10">Class 10 Careers</Link></li>
            <li><Link to="/stream">Stream Selection</Link></li>
            <li><Link to="/budget">Budget Calculator</Link></li>
            <li><Link to="/ai">AI Guidance</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><Link to="/class10">Career Exploration</Link></li>
            <li><Link to="/stream">Stream Guidance</Link></li>
            <li><Link to="/budget">Budget Planning</Link></li>
            <li><Link to="/ai">AI Career Guidance</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p style={{ color: '#ccc', lineHeight: '1.7' }}>
            Email: info@careerguide.com<br />
            Phone: +91-1234567890<br />
            Address: Career Guidance Center
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CareerGuide. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

