import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import "../styles/pages.css";

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/rooms");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load rooms");
        }
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading rooms");
      } finally {
        setLoading(false);
      }
    }
    loadRooms();
  }, []);

  if (loading) return <div className="container"><p>Loading rooms...</p></div>;
  if (error) return <div className="container"><p style={{color:'red'}}>{error}</p></div>;

  return (
    <div className="container">
      <h2 className="page-title">Available Rooms</h2>

      <div className="rooms-grid">
        {rooms.map(r => <RoomCard key={r.id} room={r} />)}
      </div>
    </div>
  );
}
