import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

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
        justifyContent: 'center',
        gap: 20,
        padding: 16,
        borderBottom: '1px solid #ccc',
        marginBottom: 24,
      }}
    >
      {navItem('/', 'Home')}
      {navItem('/feed', 'Feed')}
      {navItem('/profile', 'Profile')}
    </nav>
  );
}
