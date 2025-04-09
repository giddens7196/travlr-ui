// file: src/pages/feed.tsx
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import NavBar from "../components/NavBar";

interface TripMeta {
  id: string;
  title: string;
  uploadType: "builder" | "pdf" | "gdoc";
  fileUrl?: string;
  docUrl?: string;
  start_date?: string;
  end_date?: string;
  user?: string;
}

export default function FeedPage() {
  const [trips, setTrips] = useState<TripMeta[]>([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(all);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <NavBar />
      <h1 style={{ fontSize: 28 }}>📰 News Feed</h1>

      {trips.length === 0 && <p>No trips yet. Be the first to post!</p>}

      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
