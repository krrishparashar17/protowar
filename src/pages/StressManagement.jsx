import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import MicRecorder from "../components/stress/MicRecorder";

function StressManagement() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-4">
          <Topbar title="Stress Management Dashboard" />

          <div className="card stress-panel p-4 mb-4">
            <h5>Current Stress Level</h5>
            <h2 className="kpi-danger">72%</h2>
            <p>Emotion Detected: Stressed</p>
          </div>

          <MicRecorder />
        </div>
      </div>
    </div>
  );
}

export default StressManagement;