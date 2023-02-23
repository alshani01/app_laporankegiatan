import {
  Link,
  useMatch,
  useResolvedPath,
  useLocation,
} from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Laporan Kegiatan
      </Link>
      <ul>
        {pathname === '/' && (
          <CustomLink to="/login">Login</CustomLink>
        )}
        {pathname === '/login' && (
          <CustomLink to="/menu">Menu Petugas</CustomLink>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
    end: true,
  });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
