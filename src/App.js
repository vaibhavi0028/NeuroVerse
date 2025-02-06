import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AboutTeam from "./pages/AboutTeam";
import AboutUs from "./pages/AboutUs";
import Spline from "@splinetool/react-spline";
import Robo from "./assets/cute.splinecode";
import './index.css'; 

function App() {
  const [showTooltip, setShowTooltip] = useState(false);
      const tooltipRef = useRef(null);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
            setShowTooltip(false);
          }
        };
    
        if (showTooltip) {
          document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showTooltip]);
  return (
    <Router>
      <Navbar />
      <div className="mt-[90px]"> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutteam" element={<AboutTeam />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
      <div className="fixed bottom-2 left-4 w-34 h-34 z-10">
          <div
            ref={tooltipRef}
            className="relative cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            <Spline scene={Robo} />

            {showTooltip && (
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg transition-opacity duration-300 opacity-100">
                Hello
              </div>
            )}
          </div>
        </div>
    </Router>
  );
}

export default App;