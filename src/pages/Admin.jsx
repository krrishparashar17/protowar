import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Sidebar from "../components/layout/Sidebar";   // ADD
import Topbar from "../components/layout/Topbar";     // ADD

const departments = [
  { dept: "Computer Science", avgStress: 74, students: 120 },
  { dept: "Electronics",      avgStress: 61, students: 95  },
  { dept: "Mechanical",       avgStress: 55, students: 110 },
  { dept: "Civil",            avgStress: 48, students: 80  },
  { dept: "MBA",              avgStress: 68, students: 60  },
];

export default function Admin() {
  const [data, setData] = useState(departments);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(d => ({
          ...d,
          avgStress: Math.min(95, Math.max(30, d.avgStress + Math.floor(Math.random() * 7) - 3)),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // CHANGE: wrap everything in the same layout as other pages
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-4">
          <Topbar title="Admin Panel" />

          {/* KPI Cards */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Total Students",    value: 465, color: "#3b82f6" },
              { label: "Avg Campus Stress", value: `${Math.round(data.reduce((a, b) => a + b.avgStress, 0) / data.length)}%`, color: "#ef4444" },
              { label: "Departments",       value: 5,   color: "#10b981" },
              { label: "High Stress Depts", value: data.filter(d => d.avgStress > 65).length, color: "#f59e0b" },
            ].map((card, i) => (
              <div key={i} style={{ flex: 1, background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <p style={{ color: "#888", marginBottom: "0.5rem" }}>{card.label}</p>
                <p style={{ fontSize: "2rem", fontWeight: "bold", color: card.color }}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Department Stress Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgStress" name="Avg Stress %" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginBottom: "1rem" }}>Department Breakdown</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left", color: "#888" }}>
                  <th style={{ padding: "0.75rem" }}>Department</th>
                  <th style={{ padding: "0.75rem" }}>Students</th>
                  <th style={{ padding: "0.75rem" }}>Avg Stress</th>
                  <th style={{ padding: "0.75rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "0.75rem" }}>{row.dept}</td>
                    <td style={{ padding: "0.75rem" }}>{row.students}</td>
                    <td style={{ padding: "0.75rem", fontWeight: "bold", color: row.avgStress > 65 ? "#ef4444" : row.avgStress > 50 ? "#f59e0b" : "#10b981" }}>
                      {row.avgStress}%
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <span style={{
                        background: row.avgStress > 65 ? "#fee2e2" : row.avgStress > 50 ? "#fef3c7" : "#d1fae5",
                        color:      row.avgStress > 65 ? "#dc2626" : row.avgStress > 50 ? "#d97706" : "#059669",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        fontSize: "0.85rem"
                      }}>
                        {row.avgStress > 65 ? "🔴 High" : row.avgStress > 50 ? "🟡 Moderate" : "🟢 Low"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}