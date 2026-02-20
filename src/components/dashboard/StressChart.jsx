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

function StressChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Stress %",
        data: [45, 52, 60, 75, 68, 50, 40],
        borderColor: "#dc3545",
        backgroundColor: "rgba(220,53,69,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Weekly Stress Trend</h5>
        <Line data={data} />
      </div>
    </div>
  );
}

export default StressChart;