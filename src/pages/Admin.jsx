import Sidebar from "../components/layout/Sidebar";

function Admin() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-4">
          <h3>Admin Panel</h3>

          <div className="card shadow-sm mt-4">
            <div className="card-body">
              <h5>Department Analytics</h5>
              <p>Department stress data will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;