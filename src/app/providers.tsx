'use client';

import React from 'react';
import { ThemeProvider } from 'react-jss';
import { AuthProvider } from '@/providers/authProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={{}}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};
