import { useState, useEffect } from "react";  // ADD THIS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StressManagement from "./pages/StressManagement";
import Admin from "./pages/Admin";

// ADD THIS ARRAY (same one as StressManagement)
const STRESS_EMOTIONS = [
  { label: "Calm",            range: [10, 35] },
  { label: "Relaxed",        range: [36, 50] },
  { label: "Mildly Stressed", range: [51, 65] },
  { label: "Stressed",        range: [66, 80] },
  { label: "Very Stressed",   range: [81, 95] },
];

function App() {

  // ADD THESE - shared stress state lifted up to App level
  const [stressLevel, setStressLevel] = useState(72);
  const [emotion, setEmotion] = useState("Stressed");

  // ADD THIS - single interval at app level, feeds both pages
  useEffect(() => {
    const interval = setInterval(() => {
      const picked = STRESS_EMOTIONS[Math.floor(Math.random() * STRESS_EMOTIONS.length)];
      const [min, max] = picked.range;
      const newLevel = Math.floor(Math.random() * (max - min + 1)) + min;
      setStressLevel(newLevel);
      setEmotion(picked.label);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* CHANGE: pass stressLevel + emotion as props to both pages */}
        <Route path="/dashboard" element={<Dashboard stressLevel={stressLevel} emotion={emotion} />} />
        <Route path="/stress"    element={<StressManagement stressLevel={stressLevel} emotion={emotion} />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;