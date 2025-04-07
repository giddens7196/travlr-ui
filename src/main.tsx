// file: src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ProfilePage from './pages/profile'
import FeedPage from './pages/feed' // ✅ new route

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} /> {/* ✅ now connected */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
