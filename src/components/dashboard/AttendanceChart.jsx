import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AttendanceChart() {
  const data = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Attendance %",
        data: [88, 91, 85, 93, 89],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5>Monthly Attendance Trend</h5>
        <Line data={data} />
      </div>
    </div>
  );
}

export default AttendanceChart;