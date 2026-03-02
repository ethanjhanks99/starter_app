'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useProfile(userId: string | undefined): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, updated_at')
        .eq('id', userId)
        .single();

      if (fetchError) {
        throw new Error(`Failed to fetch profile: ${fetchError.message}`);
      }

      setProfile(data as Profile);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch profile');
      setError(error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const refetch = async () => {
    await fetchProfile();
  };

  return { profile, loading, error, refetch };
}
