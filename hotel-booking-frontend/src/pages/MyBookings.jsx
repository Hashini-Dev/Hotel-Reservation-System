import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/pages.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/user/${userId}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  }

  function openCancelModal(bookingId) {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  }

  async function handleConfirmCancel() {
    try {
      await fetch(`http://localhost:8080/api/bookings/${selectedBookingId}`, {
        method: "DELETE",
      });

      await fetchBookings();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error canceling booking.");
    }
  }

  return (
    <div className="mybookings-wrapper">
      <h2 className="page-title">My Bookings</h2>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.room.roomName}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>Rs.{booking.totalPrice.toFixed(2)}</td>
              <td>
                <button
                  className="btn cancel"
                  onClick={() => openCancelModal(booking.id)}
                >
                  Cancel
                </button>

                <button
                  className="btn edit"
                  onClick={() =>
                    navigate(`/booking/${booking.id}?edit=true`)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to cancel this booking?"
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
