// file: src/pages/FriendsView.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS: Record<string, string[]> = {
  Matt: ["Sara", "Jordan"],
  Sara: ["Matt"],
  Jordan: ["Matt"],
};

export default function FriendsView() {
  console.log("✅ FriendsView component loaded");

  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState<string>("Matt");
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    if (!storedUser) {
      storedUser = "Matt";
      localStorage.setItem("user", "Matt");
    }
    setActiveUser(storedUser);
    setFriends(USERS[storedUser] || []);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ color: "green", marginBottom: 16 }}>✅ This is the friends page</h2>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {activeUser ? `${activeUser}'s Friends` : "Loading user..."}
      </h1>
      <p style={{ color: "#999", marginBottom: 8 }}>
        Debug: user = {activeUser}, friends found = {friends.length}
      </p>
      {friends.length === 0 ? (
        <p style={{ color: "#666" }}>No friends yet. Go add some!</p>
      ) : (
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {friends.map((friend) => (
            <li
              key={friend}
              onClick={() => navigate(`/profile?user=${friend}`)}
              style={{ cursor: "pointer", color: "#0070f3", marginBottom: 8, textDecoration: "underline" }}
            >
              {friend}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
