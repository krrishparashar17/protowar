import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import KPICards from "../components/dashboard/KPICards";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import StressChart from "../components/dashboard/StressChart";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-4">
          <Topbar title="Academic Dashboard" />

          <button
            className="btn btn-outline-danger btn-modern mb-4"
            onClick={() => navigate("/stress")}
          >
            Go to Stress Management →
          </button>

          <KPICards />

          <div className="row">
            <div className="col-md-7">
              <AttendanceChart />
            </div>

            <div className="col-md-5">
              <StressChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;