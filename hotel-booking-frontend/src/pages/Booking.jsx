import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/pages.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const isEdit = query.get("edit") === "true";

  const [bookingId, setBookingId] = useState(null);

  const [roomPrice, setRoomPrice] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [roomCapacity, setRoomCapacity] = useState(1);
  const [bookedDates, setBookedDates] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchRoomDetails();
    fetchBookedDates();
    if (isEdit) fetchBookingDetails();
  }, [id]);

  async function fetchRoomDetails() {
    const res = await fetch(`http://localhost:8080/api/rooms/${id}`);
    const data = await res.json();
    setRoomPrice(data.price);
    setRoomCapacity(data.capacity);
  }

  async function fetchBookedDates() {
    const res = await fetch(`http://localhost:8080/api/bookings/room/${id}/booked-dates`);
    const data = await res.json();
    setBookedDates(data.map((d) => new Date(d)));
  }

  async function fetchBookingDetails() {
    const res = await fetch(`http://localhost:8080/api/bookings/${id}`);
    const data = await res.json();
    setBookingId(data.id);
    setCheckIn(data.checkIn);
    setCheckOut(data.checkOut);
    setGuests(data.guestsCount);
  }

  const today = new Date().toISOString().split("T")[0];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  };

  const totalPrice = roomPrice * calculateNights();

  async function handleSave() {
    const payload = {
      checkIn,
      checkOut,
      guestsCount: guests,
      totalPrice,
      bookingStatusId: 1,
      roomId: id,
      userId: parseInt(userId),
    };

    let url = "http://localhost:8080/api/bookings";
    let method = "POST";

    if (isEdit) {
      url = `http://localhost:8080/api/bookings/${bookingId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return alert(await res.text());

    navigate("/my-bookings", { replace: true });
  }

  return (
    <div className="booking-wrapper">
      <div className="booking-box">
        <h2 className="booking-title">
          {isEdit ? "Edit Booking" : `Book Room #${id}`}
        </h2>

        <div className="input-group">
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Guests</label>
          <input
            type="number"
            min="1"
            max={roomCapacity}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Total Price</label>
          <input readOnly value={totalPrice} />
        </div>

        <button className="booking-btn" onClick={handleSave}>
          {isEdit ? "Save Changes" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
