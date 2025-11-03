import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Class10 from './pages/Class10';
import Stream from './pages/Stream';
import BudgetCalculator from './pages/BudgetCalculator';
import AIGuidance from './pages/AIGuidance';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/class10" element={<Class10 />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/budget" element={<BudgetCalculator />} />
          <Route path="/ai" element={<AIGuidance />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

