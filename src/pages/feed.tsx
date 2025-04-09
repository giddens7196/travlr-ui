// file: src/pages/feed.tsx
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import SearchBar from "../components/SearchBar";

interface TripMeta {
  id: string;
  title: string;
  uploadType: "builder" | "pdf" | "gdoc";
  fileUrl?: string;
  docUrl?: string;
  start_date?: string;
  end_date?: string;
  user?: string;
  tags?: string[];
}

export default function FeedPage() {
  const [trips, setTrips] = useState<TripMeta[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(all);
  }, []);

  const filtered = trips.filter((trip) => {
    const q = query.toLowerCase();
    return (
      trip.title?.toLowerCase().includes(q) ||
      trip.user?.toLowerCase().includes(q) ||
      trip.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ fontSize: 28 }}>📰 News Feed</h1>

      <SearchBar query={query} onChange={setQuery} />

      {filtered.length === 0 && <p>No matching trips found.</p>}

      {filtered.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
