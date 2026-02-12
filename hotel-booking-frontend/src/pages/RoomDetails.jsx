import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import img1 from "../assets/room1.jpg";
import img2 from "../assets/room2.jpg";
import img3 from "../assets/room3.jpg";
import img4 from "../assets/room4.jpg";
import img5 from "../assets/room5.jpg";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const fallbackImages = [img1, img2, img3, img4, img5];

  useEffect(() => {
    fetchRoom();
  }, [id]);

  async function fetchRoom() {
    try {
      const res = await fetch(`http://localhost:8080/api/rooms/${id}`);
      if (!res.ok) throw new Error("Failed to fetch room details");
      const data = await res.json();
      setRoom(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!room) return <h3 style={{ textAlign: "center" }}>Loading room details...</h3>;

  const images = room.images && room.images.length > 0 
    ? room.images 
    : fallbackImages;

  // Handle Book Now click
  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // User is logged in, go to booking page
      navigate(`/booking/${id}`);
    } else {
      // User not logged in, redirect to login
      navigate("/login");
    }
  };

  return (
    <div className="room-details-wrapper">
      <h2 className="page-title">Room Details #{id}</h2>

      <div className="room-details-card">
        {/* IMAGE CAROUSEL */}
        <div className="room-details-image-box">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={10}
            slidesPerView={1}
            className="room-carousel"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Room ${index + 1}`}
                  style={{ width: "100%", height: "350px", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ROOM INFORMATION */}
        <div className="room-details-info">
          <h3>{room.name}</h3>

          <p className="room-desc">{room.description || "No description available."}</p>

          <p className="room-desc">
            {room.type || "Unknown"} <span>Room</span>
          </p>

          <p className="room-desc">
            {room.capacity || 1} <span>Guests</span>
          </p>

          <p className="room-price">
            Price: <span>Rs. {room.price}.00 / night</span>
          </p>

          <p className="room-desc">
            Status: <span>{room.status || "Unknown"}</span>
          </p>

          {/* BOOKING BUTTON */}
          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
