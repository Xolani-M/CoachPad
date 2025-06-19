'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthActions, useAuthState } from '@/providers/authProvider';
import UniversalRegisterForm from '@/components/(auth)/UniversalRegisterForm';
import { useAuthStyles } from '@/styles/authStyles';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  avatar?: string;
  policiesAccepted?: boolean;
  trial?: boolean;
  planType?: string;
  activeState?: boolean;
}

const RegisterPageInner: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classes = useAuthStyles();

  const { registerTrainer, registerClient } = useAuthActions();
  const {
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
    error,
  } = useAuthState();

  const [userRole, setUserRole] = useState<'trainer' | 'client'>('trainer');
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  useEffect(() => {
    const role = searchParams.get('role') as 'trainer' | 'client';
    if (role === 'trainer' || role === 'client') {
      setUserRole(role);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = userRole === 'trainer' ? '/dashboard/trainer' : '/dashboard/client';
      router.push(redirectPath);
    }
  }, [isAuthenticated, userRole, router]);

  useEffect(() => {
    if (isSuccess && !isAuthenticated) {
      const message = 'Registration successful. Please sign in.';
      setTimeout(() => {
        router.push(`/login?message=${encodeURIComponent(message)}`);
      }, 2000);
    }
  }, [isSuccess, isAuthenticated, router]);

  const handleRegisterSubmit = useCallback(
    async (data: RegisterFormData) => {
      console.log('Registering user:', userRole, data);
      setRegistrationError(null);

      try {
        const registerFunction = userRole === 'trainer' ? registerTrainer : registerClient;
        await registerFunction({
          ...data,
          role: userRole,
          planType: data.planType || 'basic',
          activeState: data.activeState ?? true,
          trial: data.trial ?? false,
          policiesAccepted: data.policiesAccepted ?? true,
        });
      } catch (err) {
        console.error('Registration error:', err);
        setRegistrationError('Registration failed. Please try again.');
      }
    },
    [userRole, registerTrainer, registerClient]
  );

  if (!registerTrainer || !registerClient) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Authentication Provider Error</h2>
        <p>Auth actions are not available. Please check if the component is wrapped in AuthProvider.</p>
      </div>
    );
  }

  return (
    <>
      {!searchParams.get('role') && (
        <div className={classes.roleSelector}>
          <div className={classes.roleSelectorContent}>
            <p className={classes.roleSelectorText}>Choose your account type:</p>
            <div className={classes.roleSelectorButtons}>
              {['trainer', 'client'].map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role as 'trainer' | 'client')}
                  className={`${classes.roleSelectorButton} ${
                    userRole === role ? classes.roleSelectorButtonActive : ''
                  }`}
                >
                  I&apos;m a {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={searchParams.get('role') ? '' : classes.withRoleSelector}>
        {(registrationError || error) && (
          <div className={classes.errorMessage}>
            {registrationError || (typeof error === 'string' ? error : 'An unexpected error occurred.')}
          </div>
        )}

        <UniversalRegisterForm
          role={userRole}
          onSubmit={handleRegisterSubmit}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
          isAuthenticated={isAuthenticated}
          errorMessage={registrationError || (typeof error === 'string' ? error : '')}
        />
      </div>
    </>
  );
};

// Wrap in Suspense to avoid the warning
const RegisterPage: React.FC = () => (
  <Suspense fallback={<div>Loading registration page...</div>}>
    <RegisterPageInner />
  </Suspense>
);

export default RegisterPage;
