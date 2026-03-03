'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/hooks';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--border)] border-t-primary"></div>
          <p className="mt-4 muted-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen flex flex-col justify-center gap-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="page-title text-4xl mb-4">
          Welcome to Starter App
        </h1>
        <p className="text-lg text-[var(--muted)] mb-8">
          A modern Next.js application with Supabase authentication and secure database integration.
        </p>

        {user ? (
          <div className="space-y-6">
            <div className="card-tight text-left max-w-xl mx-auto">
              <p className="muted-text mb-2">You are logged in as:</p>
              <p className="font-semibold break-all">
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
            <p className="muted-text">
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

      <div className="border-t border-border pt-8 text-center muted-text max-w-2xl mx-auto">
        <p>
          This starter app includes authentication, protected routes, and a secure database setup with Supabase.
        </p>
      </div>
    </div>
  );
}
