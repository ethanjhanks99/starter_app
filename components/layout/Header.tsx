import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-title">
          Starter App
        </Link>
        <div className="nav-row">{children}</div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
