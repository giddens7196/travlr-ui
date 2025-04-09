// file: src/components/TripCard.tsx
interface TripMeta {
  id: string;
  title: string;
  uploadType: "builder" | "pdf" | "gdoc";
  fileUrl?: string;
  docUrl?: string;
  user?: string;
}

export default function TripCard({ trip }: { trip: TripMeta }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        background: "#f9f9f9",
      }}
    >
      <p style={{ margin: 0 }}>
        <strong>{trip.title}</strong> ({trip.uploadType})
      </p>
      {trip.user && (
        <p style={{ margin: "4px 0 8px 0", fontSize: 14 }}>by {trip.user}</p>
      )}
      {trip.uploadType === "pdf" && trip.fileUrl && (
        <a href={trip.fileUrl} target="_blank" rel="noopener noreferrer">
          📄 View PDF
        </a>
      )}
      {trip.uploadType === "gdoc" && trip.docUrl && (
        <a href={trip.docUrl} target="_blank" rel="noopener noreferrer">
          📄 View Google Doc
        </a>
      )}
    </div>
  );
}
