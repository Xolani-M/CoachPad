'use client';

import { createUseStyles } from 'react-jss';
import jss from '../lib/jss';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: '1rem',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '2rem',
    width: '100%',
    maxWidth: '28rem',
    '@media (min-width: 640px)': {
      maxWidth: '32rem',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
    '@media (max-width: 640px)': {
      fontSize: '1.5rem',
    },
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputRow: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      gap: '1.5rem',
    },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    '&:disabled': {
      backgroundColor: '#f9fafb',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&::placeholder': {
      color: '#9ca3af',
    },
  },
  inputError: {
    borderColor: '#ef4444',
    '&:focus': {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    minHeight: '3rem',
    '&:hover:not(:disabled)': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },
    '&:active:not(:disabled)': {
      transform: 'translateY(0px)',
    },
    '&:disabled': {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  registerButton: {
    backgroundColor: '#10b981',
    '&:hover:not(:disabled)': {
      backgroundColor: '#059669',
    },
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  globalError: {
    color: '#ef4444',
    fontSize: '0.875rem',
    textAlign: 'center',
    padding: '0.75rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
  },
  successMessage: {
    color: '#10b981',
    fontSize: '0.875rem',
    textAlign: 'center',
    padding: '0.75rem',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '0.5rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: '#2563eb',
      textDecoration: 'underline',
    },
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '1rem',
    height: '1rem',
    border: '2px solid transparent',
    borderTop: '2px solid currentColor',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite',
    marginRight: '0.5rem',
  },
  roleSelector: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    zIndex: 1000,
  },
  roleSelectorContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  roleSelectorText: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    fontWeight: '500',
  },
  roleSelectorButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  roleSelectorButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  roleSelectorButtonActive: {
    backgroundColor: 'white',
    color: '#3b82f6',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  withRoleSelector: {
    paddingTop: '100px',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
} as const; //  locks the object for strong typing

type StyleKeys = keyof typeof styles;

const options = {
  jss,
  generateId: (rule: { key: string }) => `auth-${rule.key}`,
  classNamePrefix: 'auth-',
  index: 1,
};

export const useAuthStyles = createUseStyles<StyleKeys, string>(styles, options);
