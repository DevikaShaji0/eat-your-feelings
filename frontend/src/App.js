import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VibeCheckPage from "./components/VibeCheckPage";
import RealityCheckPage from "./components/RealityCheckPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mood, setMood] = useState('');

  const handleNext = () => {
    if (currentPage === 'home') {
      setCurrentPage('vibecheck');
    } else if (currentPage === 'vibecheck') {
      setCurrentPage('realitycheck');
    }
  };

  const handleBack = () => {
    if (currentPage === 'realitycheck') {
      setCurrentPage('vibecheck');
    } else if (currentPage === 'vibecheck') {
      setCurrentPage('home');
    }
  };

  const handleReset = () => {
    setMood('');
    setCurrentPage('vibecheck');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              {currentPage === 'home' && (
                <HomePage onNext={handleNext} />
              )}
              {currentPage === 'vibecheck' && (
                <VibeCheckPage 
                  onBack={handleBack}
                  onNext={handleNext}
                  mood={mood}
                  setMood={setMood}
                />
              )}
              {currentPage === 'realitycheck' && (
                <RealityCheckPage 
                  onBack={handleBack}
                  onReset={handleReset}
                  mood={mood}
                />
              )}
            </div>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;