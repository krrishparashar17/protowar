function Topbar({ title }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-semibold">{title}</h3>
      <span className="badge bg-primary px-3 py-2">
        Welcome, Krrish
      </span>
    </div>
  );
}

export default Topbar;