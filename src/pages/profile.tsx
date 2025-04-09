// file: src/pages/profile.tsx
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import CreateTrip, { Trip as BuilderTrip } from "../components/CreateTrip";
import TripCard from "../components/TripCard";

interface TripMeta {
  id: string;
  title: string;
  uploadType: "builder" | "pdf" | "gdoc";
  fileUrl?: string;
  docUrl?: string;
  start_date?: string;
  end_date?: string;
  destinations?: string[];
  tags?: string[];
  shared_with?: string[];
  day_plans?: any[];
  user?: string;
}

export default function ProfilePage() {
  const [params] = useSearchParams();
  const overrideUser = params.get("user");
  const currentUser = overrideUser || localStorage.getItem("user") || "Matt";
  const [tab, setTab] = useState<"timeline" | "trips">("timeline");
  const [trips, setTrips] = useState<TripMeta[]>(() => {
    const stored = JSON.parse(localStorage.getItem("trips") || "[]");
    return stored.filter((trip: TripMeta) => trip.user === currentUser);
  });
  const [uploading, setUploading] = useState(false);

  const saveTrip = (newTrip: TripMeta) => {
    const all = JSON.parse(localStorage.getItem("trips") || "[]");
    const updated = [newTrip, ...all];
    localStorage.setItem("trips", JSON.stringify(updated));
    setTrips(updated.filter((trip: TripMeta) => trip.user === currentUser));
  };

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fakeUrl = URL.createObjectURL(file);
    const newTrip: TripMeta = {
      id: Date.now().toString(),
      title: file.name,
      uploadType: "pdf",
      fileUrl: fakeUrl,
      user: currentUser,
    };
    saveTrip(newTrip);
    setUploading(false);
  };

  const handleGoogleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("docUrl") as HTMLInputElement;
    const url = input.value;
    if (!url) return;
    const newTrip: TripMeta = {
      id: Date.now().toString(),
      title: "Google Doc Trip",
      uploadType: "gdoc",
      docUrl: url,
      user: currentUser,
    };
    saveTrip(newTrip);
    input.value = "";
  };

  const handleTripBuilderCreate = (trip: BuilderTrip) => {
    const newTrip: TripMeta = {
      ...trip,
      user: currentUser,
    };
    saveTrip(newTrip);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1 style={{ fontSize: 28 }}>👤 {currentUser}'s Profile</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <button onClick={() => setTab("timeline")}>Timeline</button>
        <button onClick={() => setTab("trips")}>Trips</button>
      </div>

      {tab === "trips" && (
        <div style={{ marginTop: 30 }}>
          {!overrideUser && <CreateTrip onCreate={handleTripBuilderCreate} />}

          {!overrideUser && (
            <>
              <h2>📄 Upload Trip</h2>
              <div style={{ marginBottom: 20 }}>
                <label>
                  Upload PDF:
                  <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
                </label>
              </div>

              <form onSubmit={handleGoogleDocSubmit}>
                <label>
                  Paste Google Doc URL:
                  <input name="docUrl" placeholder="https://docs.google.com/..." style={{ width: "100%" }} />
                </label>
                <button type="submit">Submit Google Doc</button>
              </form>
            </>
          )}

          <div style={{ marginTop: 40 }}>
            <h3>📚 {overrideUser ? `${overrideUser}'s` : "Your"} Trips</h3>
            {uploading && <p>Uploading...</p>}
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      )}

      {tab === "timeline" && (
        <div style={{ marginTop: 30 }}>
          <h2>🕘 Timeline (coming soon...)</h2>
        </div>
      )}
    </div>
  );
}
