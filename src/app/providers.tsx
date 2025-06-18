'use client';

import { AuthProvider } from '@/providers/authProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};
