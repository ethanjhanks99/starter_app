'use client';

import { ProtectedRouteWithFallback } from '@/lib/auth/protected';
import { Header } from '@/components/layout/Header';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { LogoutButton as Nav } from '@/components/auth/LogoutButton';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <ProtectedRouteWithFallback>
      <Header>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            Profile
          </Link>
          <LogoutButton />
        </div>
      </Header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome to your dashboard. This page is protected and requires authentication.
          </p>
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <p className="text-gray-600">Profile information will be displayed here once fully implemented.</p>
          </div>
        </div>
      </div>
    </ProtectedRouteWithFallback>
  );
}
