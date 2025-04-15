import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import Navbar from './components/Navbar';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Temporary test routes */}
        <Route path="/test/client-dashboard" element={<ClientDashboard />} />
        <Route path="/test/freelancer-dashboard" element={<FreelancerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
