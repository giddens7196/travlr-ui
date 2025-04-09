// file: src/pages/wishlist.tsx
import { useState } from "react";
import NavBar from "../components/NavBar";

interface WishlistItem {
  id: string;
  destination: string;
  notes?: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });
  const [destination, setDestination] = useState("");
  const [notes, setNotes] = useState("");

  const addItem = () => {
    if (!destination.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      destination,
      notes,
    };
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setDestination("");
    setNotes("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <NavBar />
      <h1 style={{ fontSize: 28 }}>🌍 Trips I Want to Take</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <textarea
          placeholder="Notes or places to visit there..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button onClick={addItem} style={{ padding: 10 }}>Add to Wishlist</button>
      </div>

      <div style={{ marginTop: 30 }}>
        {items.length === 0 && <p>No saved destinations yet.</p>}
        {items.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
          >
            <h3>{item.destination}</h3>
            <p>{item.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
