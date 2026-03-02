'use client';

import { ProtectedRouteWithFallback } from '@/lib/auth/protected';
import { Header } from '@/components/layout/Header';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { useAuth } from '@/lib/auth/hooks';
import { useProfile } from '@/lib/auth/useProfile';
import Avatar from '@/components/ui/Avatar';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, error } = useProfile(user?.id);

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (profile?.email) {
      return profile.email[0].toUpperCase();
    }
    return '?';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ProtectedRouteWithFallback>
      <Header>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
            Profile
          </Link>
          <LogoutButton />
        </div>
      </Header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {authLoading || profileLoading ? (
          <div className="card">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="card bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <h2 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Error Loading Profile</h2>
            <p className="text-red-700 dark:text-red-200 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        ) : profile ? (
          <div className="space-y-6">
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <Avatar
                  src={profile.avatar_url}
                  alt={profile.full_name || profile.email}
                  initials={getInitials()}
                  size="lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {profile.full_name || 'Your Profile'}
                  </h1>
                  <div className="space-y-3 text-gray-600 dark:text-gray-400">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-500">Email</p>
                      <p className="break-all">{profile.email}</p>
                    </div>
                    {profile.full_name && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-500">Full Name</p>
                        <p>{profile.full_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-500">Last Updated</p>
                      <p className="text-sm">{formatDate(profile.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/profile" className="block">
                <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Edit Profile</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Update your profile information and preferences
                  </p>
                  <div className="mt-4 text-primary font-medium">View Profile →</div>
                </div>
              </Link>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Stats</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Account Status: <span className="font-medium text-green-600 dark:text-green-400">Active</span></p>
                  <p>Authentication: <span className="font-medium text-green-600 dark:text-green-400">Verified</span></p>
                  <p>Profile Completeness: {profile.full_name && profile.avatar_url ? '100%' : profile.full_name || profile.avatar_url ? '66%' : '33%'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center">
            <p className="text-gray-600 dark:text-gray-400">No profile found. Please log in again.</p>
          </div>
        )}
      </div>
    </ProtectedRouteWithFallback>
  );
}
