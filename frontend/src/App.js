import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AppPage from "./components/AppPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleStart = () => {
    setCurrentPage('app');
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              {currentPage === 'landing' ? (
                <LandingPage onStart={handleStart} />
              ) : (
                <AppPage onBack={handleBack} />
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