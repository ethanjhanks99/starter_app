import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="w-full max-w-md">
          <LoginForm />
          <p className="muted-text text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="link font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
