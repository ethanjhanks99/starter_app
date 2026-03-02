'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { createSupabaseClient } from '@/lib/supabase/client';

export const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout failed:', error.message);
        return;
      }

      // Redirect to home page after successful logout
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="secondary"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </Button>
  );
};
