import { SignupForm } from '@/components/auth/SignupForm';
import { Header } from '@/components/layout/Header';

export default function SignupPage() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md">
          <SignupForm />
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
