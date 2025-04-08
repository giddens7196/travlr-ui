import { useState } from "react";
import CreateTrip, { Trip as BuilderTrip } from "../components/CreateTrip";
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

export default function ProfilePage() {
  const currentUser = localStorage.getItem("user") || "Matt"; // ✅ read selected user
  const [tab, setTab] = useState<"timeline" | "trips">("timeline");
  const [trips, setTrips] = useState<TripMeta[]>([]);
  const [uploading, setUploading] = useState(false);

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
    setTrips((prev) => [newTrip, ...prev]);
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
    setTrips((prev) => [newTrip, ...prev]);
    input.value = "";
  };

  const handleTripBuilderCreate = (trip: BuilderTrip) => {
    const newTrip: TripMeta = {
      ...trip,
      user: currentUser,
    };
    setTrips((prev) => [newTrip, ...prev]);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <NavBar />
      <h1 style={{ fontSize: 28 }}>👤 {currentUser}'s Profile</h1> {/* ✅ dynamic user heading */}

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <button onClick={() => setTab("timeline")}>Timeline</button>
        <button onClick={() => setTab("trips")}>Trips</button>
      </div>

      {tab === "trips" && (
        <div style={{ marginTop: 30 }}>
          <CreateTrip onCreate={handleTripBuilderCreate} />

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

          <div style={{ marginTop: 40 }}>
            <h3>📚 Your Trips</h3>
            {uploading && <p>Uploading...</p>}
            {trips.map((trip) => (
              <div key={trip.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
                <p><strong>{trip.title}</strong> ({trip.uploadType})</p>
                {trip.uploadType === "pdf" && trip.fileUrl && (
                  <a href={trip.fileUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                )}
                {trip.uploadType === "gdoc" && trip.docUrl && (
                  <a href={trip.docUrl} target="_blank" rel="noopener noreferrer">View Google Doc</a>
                )}
              </div>
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
