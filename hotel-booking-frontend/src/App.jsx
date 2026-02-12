import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import RoomsList from "./pages/RoomsList";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ WRAPPER that controls footer position */}
      <div className="app-layout">

        <Navbar />

        {/* ✅ Content must be inside main */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/rooms" element={<ManageRooms />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}
