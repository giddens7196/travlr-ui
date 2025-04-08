// file: src/App.tsx
import NavBar from "./components/NavBar";

function App() {
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <NavBar />
      <h1 style={{ fontSize: 28 }}>🏠 Welcome to Travlr</h1>
      <p style={{ marginTop: 12 }}>
        This is your travel social hub. Use the nav bar above to explore your profile, trip feed, and more.
      </p>
    </div>
  );
}

export default App;
