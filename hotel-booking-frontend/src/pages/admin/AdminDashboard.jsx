// import "../../styles/pages.css";

export default function AdminDashboard() {
  return (
    <div className="container">
      <h2 className="page-title">Admin Dashboard</h2>

      <div className="admin-grid">
        <a href="/admin/rooms" className="admin-card">Manage Rooms</a>
        <a href="/admin/bookings" className="admin-card">Manage Bookings</a>
        <a href="/admin/users" className="admin-card">Manage Users</a>
      </div>
    </div>
  );
}
