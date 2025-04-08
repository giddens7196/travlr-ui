import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const USERS = ["Matt", "Sara", "Jordan"];

export default function NavBar() {
  const location = useLocation();
  const [user, setUser] = useState(() => localStorage.getItem("user") || "Matt");

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const navItem = (to: string, label: string) => (
    <Link
      to={to}
      style={{
        padding: '8px 16px',
        textDecoration: 'none',
        color: location.pathname === to ? '#000' : '#555',
        fontWeight: location.pathname === to ? 'bold' : 'normal',
        borderBottom: location.pathname === to ? '2px solid #000' : 'none',
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottom: '1px solid #ccc',
        marginBottom: 24,
      }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        {navItem('/', 'Home')}
        {navItem('/feed', 'Feed')}
        {navItem('/profile', 'Profile')}
      </div>
      <select
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ padding: 6 }}
      >
        {USERS.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </nav>
  );
}
