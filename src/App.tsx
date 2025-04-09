// file: src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/profile";
import FeedPage from "./pages/feed";
import FriendsPage from "./pages/friends";
import WishlistPage from "./pages/wishlist";

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Welcome to Travlr</h1>
      <p>Use the navigation bar to explore trips, your profile, or wishlist.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}
