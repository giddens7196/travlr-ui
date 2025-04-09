// file: src/pages/friends.tsx
import { useNavigate } from "react-router-dom";

const FRIENDS = ["Matt", "Sara", "Jordan"];

export default function FriendsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: 28 }}>👥 Your Friends</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {FRIENDS.map((name) => (
          <li key={name} style={{ marginBottom: 12 }}>
            <button
              style={{ padding: 10, width: "100%" }}
              onClick={() => navigate(`/profile?user=${name}`)}
            >
              View {name}'s Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
