import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import Home from './pages/Home';
import Translator from './pages/Translator';
import Learning from './pages/Learning';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-darkBg text-white relative overflow-hidden font-sans">
        <BackgroundEffects />
        
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/translator" element={<Translator />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
