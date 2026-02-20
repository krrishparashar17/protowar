function KPICards() {
  const data = [
    { title: "Current Stress", value: "72%", class: "kpi-danger" },
    { title: "Attendance", value: "89%", class: "kpi-primary" },
    { title: "Subjects", value: "6", class: "kpi-success" },
    { title: "Wellness Score", value: "78/100", class: "kpi-warning" },
  ];

  return (
    <div className="row mb-4">
      {data.map((item, index) => (
        <div className="col-md-3" key={index}>
          <div className="card kpi-card p-3">
            <h6 className="text-muted">{item.title}</h6>
            <h3 className={item.class}>{item.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KPICards;