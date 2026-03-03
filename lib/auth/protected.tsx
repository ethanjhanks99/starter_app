'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from './hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute wrapper for client components
 * Redirects unauthenticated users to login
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center muted-text">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export function ProtectedRouteWithFallback({
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center muted-text">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="auth-container flex-col">
        <div className="card w-full max-w-md text-center">
          <h1 className="section-title mb-3">Access Denied</h1>
          <p className="muted-text mb-4">Please sign in to access this page.</p>
          <Link href="/login" className="link font-medium">
          Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
