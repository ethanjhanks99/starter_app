'use client';

import Link from 'next/link';

interface NavigationProps {
  isAuthenticated?: boolean;
  userEmail?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, userEmail }) => {
  return (
    <nav className="nav-row">
      {!isAuthenticated ? (
        <>
          <Link href="/login" className="nav-link">
            Sign In
          </Link>
          <Link href="/signup" className="nav-link">
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <span className="muted-text max-w-44 truncate">{userEmail}</span>
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/profile" className="nav-link">
            Profile
          </Link>
        </>
      )}
    </nav>
  );
};

Navigation.displayName = 'Navigation';
