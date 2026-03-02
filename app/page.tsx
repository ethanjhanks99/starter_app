'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/hooks';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
          <p className="mt-4 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col items-center justify-center min-h-screen gap-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Starter App
        </h1>
        <p className="text-lg text-muted mb-8">
          A modern Next.js application with Supabase authentication and secure database integration.
        </p>

        {user ? (
          <div className="space-y-6">
            <div className="card bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-sm text-muted mb-2">You are logged in as:</p>
              <p className="font-semibold text-gray-900 dark:text-white break-all">
                {user.email}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="primary">Go to Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="secondary">View Profile</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-muted">
              Get started by signing up or logging in to your account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary">Log In</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted max-w-2xl">
        <p>
          This starter app includes authentication, protected routes, and a secure database setup with Supabase.
        </p>
      </div>
    </div>
  );
}
