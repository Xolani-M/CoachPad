'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStyles } from '@/styles/authStyles';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isPending: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
  userRole?: 'trainer' | 'client' | null;
}

interface FormData {
  email: string;
  password: string;
}

const UniversalLoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isPending,
  isError,
  isAuthenticated,
  errorMessage,
  userRole,
}) => {
  const classes = useAuthStyles();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isAuthenticated && userRole) {
      const redirectPath = userRole === 'trainer' ? '/dashboard/trainer' : '/dashboard/client';
      window.history.replaceState(null, '', redirectPath);
      window.location.href = redirectPath;
    }
  }, [isAuthenticated, userRole]);

  return (
    <div suppressHydrationWarning className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h1 className={classes.title}>Welcome Back</h1>
          <p className={classes.subtitle}>Sign in to your CoachPad account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.inputGroup}>
            <label htmlFor="email" className={classes.label}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
              placeholder="Enter your email address"
              disabled={isPending}
              autoComplete="email"
            />
            {errors.email && <span className={classes.errorMessage}>{errors.email}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label htmlFor="password" className={classes.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
              placeholder="Enter your password"
              disabled={isPending}
              autoComplete="current-password"
            />
            {errors.password && <span className={classes.errorMessage}>{errors.password}</span>}
          </div>

          {isError && <div className={classes.globalError}>{errorMessage || 'Invalid credentials. Please try again.'}</div>}

          <button
            type="submit"
            disabled={isPending || Object.values(errors).some(e => e !== undefined)}
            className={classes.button}
          >
            {isPending && <span className={classes.loadingSpinner} />}
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className={classes.footer}>
          Don&apos;t have an account?{' '}
          <a href="/register" className={classes.link}>Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default UniversalLoginForm;