'use client';

import Link from 'next/link';

interface NavigationProps {
  isAuthenticated?: boolean;
  userEmail?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, userEmail }) => {
  return (
    <nav className="space-x-4">
      {!isAuthenticated ? (
        <>
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
          <Link href="/signup" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <span className="text-gray-600">{userEmail}</span>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </Link>
          <Link href="/profile" className="text-blue-600 hover:text-blue-800">
            Profile
          </Link>
        </>
      )}
    </nav>
  );
};

Navigation.displayName = 'Navigation';
