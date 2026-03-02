import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/layout/Header';

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md">
          <LoginForm />
          <p className="text-center mt-4 text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
