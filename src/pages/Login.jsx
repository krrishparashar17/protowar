import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">UMS Login</h4>

        <input className="form-control mb-3" placeholder="UID" />
        <input type="password" className="form-control mb-3" placeholder="Password" />

        <button
          className="btn btn-primary w-100"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;