import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '@/lib/auth/hooks';

const { getUserMock } = vi.hoisted(() => ({
  getUserMock: vi.fn(),
}));

vi.mock('@/lib/supabase/client', () => ({
  createSupabaseClient: () => ({
    auth: {
      getUser: getUserMock,
    },
  }),
}));

describe('useAuth', () => {
  beforeEach(() => {
    getUserMock.mockReset();
  });

  it('returns user data after successful auth fetch', async () => {
    getUserMock.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          email: 'user@example.com',
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual({
      id: 'user-1',
      email: 'user@example.com',
    });
    expect(result.current.error).toBeNull();
  });

  it('returns error state when auth fetch fails', async () => {
    getUserMock.mockRejectedValue(new Error('Failed to get user'));

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error?.message).toBe('Failed to get user');
  });
});