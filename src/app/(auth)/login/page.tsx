'use client';

import React, {useEffect} from 'react';
import { useAuthActions, useAuthState } from '@/providers/authProvider';
import UniversalLoginForm from '@/components/(auth)/UniversalLoginForm';
import { useRouter } from 'next/navigation';



const LoginPage = () => {
  const { login } = useAuthActions();
  const { isPending, isError, isAuthenticated, error, user } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const role = user?.role;
      if (role === "admin") {
        router.push("/dashboard/trainer");
      } else if (role === "user") {
        router.push("/dashboard/client");
      }
    }
  }, [isAuthenticated, user, router]);


  const handleLogin = (credentials: { email: string; password: string }) => {
    login(credentials);
  };

  return (
    <UniversalLoginForm
      onSubmit={handleLogin}
      isPending={isPending}
      isError={isError}
      isAuthenticated={isAuthenticated}
      errorMessage={typeof error === 'string' ? error : 'Something went wrong'}
      userRole={user?.role === "admin" ? "trainer" : user?.role === "user" ? "client" : null}
    />
  );
};

export default LoginPage;