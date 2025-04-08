// src/pages/FriendsPage.tsx
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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{activeUser}'s Friends</h1>
      {friends.length === 0 ? (
        <p className="text-gray-600">No friends yet. Go add some!</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li
              key={friend}
              onClick={() => navigate(`/profile?user=${friend}`)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {friend}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
