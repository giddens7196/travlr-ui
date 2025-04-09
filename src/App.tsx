// file: src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/profile";
import FeedPage from "./pages/feed";
import FriendsPage from "./pages/FriendsView";

function App() {
  return (
    <Router>
      <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 style={{ fontSize: 28 }}>🏠 Welcome to Travlr</h1>
                <p style={{ marginTop: 12 }}>
                  This is your travel social hub. Use the nav bar above to explore your profile, trip feed, and more.
                </p>
              </>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
