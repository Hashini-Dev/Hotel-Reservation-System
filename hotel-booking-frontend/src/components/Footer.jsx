import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube
} from "react-icons/fa";
import {
  IoCall,
  IoMail,
  IoLocationSharp
} from "react-icons/io5";

import "../styles/components.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-column">
          <h2 className="footer-logo">HotelBooking</h2>

          <h4 className="footer-title">CONTACT US</h4>

          <p className="footer-row">
            <IoLocationSharp size={18} />
            Maradana, Colombo 10, Sri Lanka
          </p>

          <p className="footer-row">
            <IoMail size={18} />
            hotelbooking@gmail.com
          </p>

          <p className="footer-row">
            <IoCall size={18} />
            +94 116 767632
          </p>

          <p className="footer-row">
            <FaWhatsapp size={18} />
            +94 765 54542
          </p>
        </div>

        {/* Middle Section */}
        <div className="footer-column">
          <h4 className="footer-title">Quick Links</h4>
          <p className="footer-link">Home</p>
          <p className="footer-link">My Account</p>
          <p className="footer-link">About Us</p>
          <p className="footer-link">Contact Us</p>
        </div>

        {/* Right Section */}
        <div className="footer-column">
          <h4 className="footer-title">Stay Connected</h4>

          <input
            type="email"
            placeholder="name@gmail.com"
            className="footer-input"
          />

          <button className="footer-btn">Subscribe</button>

          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaWhatsapp />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

      </div>
    </footer>
  );
}
