// file: src/pages/FriendsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS: Record<string, string[]> = {
  Matt: ["Sara", "Jordan"],
  Sara: ["Matt"],
  Jordan: ["Matt"],
};

export default function FriendsPage() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState<string>("");
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "Matt";
    setActiveUser(storedUser);
    setFriends(USERS[storedUser] || []);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {activeUser}'s Friends
      </h1>
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
