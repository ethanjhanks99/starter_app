import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '@/__tests__/utils/test-utils';
import { LoginForm } from '@/components/auth/LoginForm';

const { pushMock, refreshMock, signInWithPasswordMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  signInWithPasswordMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock('@/lib/supabase/client', () => ({
  createSupabaseClient: () => ({
    auth: {
      signInWithPassword: signInWithPasswordMock,
    },
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
    signInWithPasswordMock.mockReset();
  });

  it('shows Supabase error message when login fails', async () => {
    const user = userEvent.setup();
    signInWithPasswordMock.mockResolvedValue({
      data: { user: null },
      error: { message: 'Invalid login credentials' },
    });

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), '12345678');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid login credentials')).toBeInTheDocument();
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('submits credentials and redirects on successful login', async () => {
    const user = userEvent.setup();
    signInWithPasswordMock.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), '12345678');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(signInWithPasswordMock).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: '12345678',
      });
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
      expect(refreshMock).toHaveBeenCalled();
    });
  });
});