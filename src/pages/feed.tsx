import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

interface TripCardProps {
  title: string;
  user: string;
  days: number;
  location: string;
  type: string;
  link?: string;
}

const mockTrips: TripCardProps[] = [
  {
    title: "8-Day Paris Adventure",
    user: "Matt",
    days: 8,
    location: "Paris",
    type: "builder",
  },
  {
    title: "Girls Trip to Tulum",
    user: "Sara",
    days: 5,
    location: "Tulum",
    type: "pdf",
    link: "https://example.com/sara-trip.pdf",
  },
  {
    title: "2 Weeks in Italy",
    user: "Jordan",
    days: 14,
    location: "Rome, Florence, Venice",
    type: "gdoc",
    link: "https://docs.google.com/document/d/example",
  },
];

export default function FeedPage() {
  const [trips, setTrips] = useState<TripCardProps[]>([]);

  useEffect(() => {
    setTrips(mockTrips);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <NavBar />
      <h1 style={{ fontSize: 28 }}>📰 Trip Feed</h1>
      <p>Here’s what your friends have been up to recently:</p>

      {trips.map((trip, idx) => (
        <div key={idx} style={{ border: "1px solid #ddd", padding: 12, marginTop: 16 }}>
          <p><strong>{trip.user}</strong> just went on a <strong>{trip.days}-day trip</strong> to <strong>{trip.location}</strong>!</p>
          <p style={{ marginBottom: 4 }}>{trip.title}</p>
          {trip.link && (
            <a href={trip.link} target="_blank" rel="noopener noreferrer">
              View Trip ({trip.type})
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
