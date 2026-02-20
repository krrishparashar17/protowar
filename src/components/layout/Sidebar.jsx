import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="col-md-2 sidebar p-4">
      <h4 className="mb-4">UMS Portal</h4>

      <ul className="nav flex-column gap-2">
        <li>
          <Link to="/dashboard" className="nav-link">
            📊 Academic Dashboard
          </Link>
        </li>

        <li>
          <Link to="/stress" className="nav-link">
            🧠 Stress Management
          </Link>
        </li>

        <li>
          <Link to="/admin" className="nav-link">
            ⚙ Admin Panel
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;