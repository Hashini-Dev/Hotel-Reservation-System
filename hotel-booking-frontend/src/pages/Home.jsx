import "../styles/pages.css";

export default function Home() {
  return (
    <div className="home-banner">
      <div className="banner-text">
        <h1>Find Your Perfect Stay</h1>
        <p>Luxury rooms, affordable prices — book your dream hotel now.</p>
        <a href="/rooms"><button>Browse Rooms</button></a>
      </div>
    </div>
  );
}
