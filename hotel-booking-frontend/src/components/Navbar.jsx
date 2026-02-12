import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    // Remove token and userId
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);

    navigate("/");

  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">HotelBooking</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/my-bookings">My Bookings</Link></li>
        </ul>

        <div className="nav-auth">
          {isLoggedIn ? (
            <button className="register-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="register-btn" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
