import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '@/__tests__/utils/test-utils';
import { SignupForm } from '@/components/auth/SignupForm';

const { pushMock, refreshMock, signUpMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  signUpMock: vi.fn(),
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
      signUp: signUpMock,
    },
  }),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
    signUpMock.mockReset();
  });

  it('shows validation error when password is shorter than 8 characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignupForm />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');

    await user.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com');
    await user.type(passwordInputs[0], '1234567');
    await user.type(passwordInputs[1], '1234567');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(signUpMock).not.toHaveBeenCalled();
  });

  it('shows validation error when passwords do not match', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignupForm />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');

    await user.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com');
    await user.type(passwordInputs[0], '12345678');
    await user.type(passwordInputs[1], '87654321');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    expect(signUpMock).not.toHaveBeenCalled();
  });

  it('submits credentials and redirects on successful signup', async () => {
    const user = userEvent.setup();
    signUpMock.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });

    renderWithProviders(<SignupForm />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');

    await user.type(screen.getByPlaceholderText('you@example.com'), 'user@example.com');
    await user.type(passwordInputs[0], '12345678');
    await user.type(passwordInputs[1], '12345678');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: '12345678',
      });
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
      expect(refreshMock).toHaveBeenCalled();
    });
  });
});