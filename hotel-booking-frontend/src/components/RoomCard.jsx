import { Link } from "react-router-dom";
import "../styles/components.css";

import placeholderImg from "../assets/room1.jpg";

export default function RoomCard({ room }) {
  const imgSrc =
    room.images && room.images.length > 0 ? room.images[0] : placeholderImg;

  return (
    <div className="room-card">

      {/* NOT AVAILABLE LABEL */}
      {!room.availableToday && (
        <span className="not-available-label">Not Available</span>
      )}

      <img
        src={imgSrc}
        alt={room.name}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />

      <div className="room-card-info">
        <h3>{room.name}</h3>
        <p className="room-type">Type: {room.type ?? "—"}</p>
        <p className="room-price">Rs.{room.price}.00/night</p>

        <Link to={`/rooms/${room.id}`}>
          <button className="room-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
