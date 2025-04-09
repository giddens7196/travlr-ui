// file: src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/profile";
import FeedPage from "./pages/feed";
import FriendsPage from "./pages/friends";
import TestPage from "./pages/test";
import WishlistPage from "./pages/wishlist";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Welcome to Travlr</h1>
      <p>Use the navigation above to get started.</p>
    </div>
  );
}

export default App;
