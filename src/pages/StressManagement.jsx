import { useState } from "react";  // removed useEffect, no longer needed
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MicRecorder from "../components/stress/MicRecorder";

const STRESS_EMOTIONS = [
  { label: "Calm",            range: [10, 35] },
  { label: "Relaxed",         range: [36, 50] },
  { label: "Mildly Stressed", range: [51, 65] },
  { label: "Stressed",        range: [66, 80] },
  { label: "Very Stressed",   range: [81, 95] },
];

// ADD THIS - called by MicRecorder when recording stops
function analyzeAndUpdate(setStressLevel, setEmotion) {
  const picked = STRESS_EMOTIONS[Math.floor(Math.random() * STRESS_EMOTIONS.length)];
  const [min, max] = picked.range;
  const newLevel = Math.floor(Math.random() * (max - min + 1)) + min;
  setStressLevel(newLevel);
  setEmotion(picked.label);
}

function StressManagement() {
  const [stressLevel, setStressLevel] = useState(72);
  const [emotion, setEmotion]         = useState("Stressed");
  const [isAnalyzing, setIsAnalyzing] = useState(false); // ADD - shows "Analyzing..." state

  // This gets passed down to MicRecorder and called when recording stops
  const handleRecordingStop = () => {
    setIsAnalyzing(true); // show analyzing state

    // Small delay to simulate analysis processing
    setTimeout(() => {
      analyzeAndUpdate(setStressLevel, setEmotion);
      setIsAnalyzing(false);
    }, 1500); // 1.5 sec "analyzing" pause feels realistic
  };

  const stressColor =
    stressLevel > 65 ? "kpi-danger" :
    stressLevel > 40 ? "kpi-warning" :
    "kpi-success";

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-4">
          <Topbar title="Stress Management Dashboard" />

          <div className="card stress-panel p-4 mb-4">
            <h5>Current Stress Level</h5>

            {/* Shows "Analyzing..." while processing, result after */}
            {isAnalyzing ? (
              <h2 style={{ color: "#888" }}>Analyzing...</h2>
            ) : (
              <h2 className={stressColor}>{stressLevel}%</h2>
            )}

            <p>Emotion Detected: {isAnalyzing ? "Processing voice..." : emotion}</p>
          </div>

          {/* CHANGE: pass handleRecordingStop as prop to MicRecorder */}
          <MicRecorder onRecordingStop={handleRecordingStop} />

        </div>
      </div>
    </div>
  );
}

export default StressManagement;