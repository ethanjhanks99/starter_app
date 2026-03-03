import { SignupForm } from '@/components/auth/SignupForm';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="w-full max-w-md">
          <SignupForm />
          <p className="muted-text text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="link font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
