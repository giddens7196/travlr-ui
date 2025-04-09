// file: src/pages/test.tsx
import NavBar from "../components/NavBar";

export default function TestPage() {
  console.log("✅ TestPage loaded");

  return (
    <div style={{ padding: 20 }}>
      <NavBar />
      <h1>🧪 This is a test page</h1>
      <p>If you're seeing this, routing and deployment are working.</p>
    </div>
  );
}
