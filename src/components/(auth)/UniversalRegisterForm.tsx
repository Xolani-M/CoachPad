'use client';

import React, { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { useAuthStyles } from '@/styles/authStyles';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  avatar?: string;
  trainerId?: string;
  dateOfBirth?: string;
  policiesAccepted: boolean;
}

interface RegisterFormProps {
  role: 'trainer' | 'client';
  onSubmit: (data: RegisterFormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
}

const UniversalRegisterForm: React.FC<RegisterFormProps> = ({
  role,
  onSubmit,
  isPending,
  isSuccess,
  isError,
  isAuthenticated,
  errorMessage
}) => {
  const classes = useAuthStyles();

  const initialFormState: RegisterFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    avatar: '',
    policiesAccepted: false,
    ...(role === 'client' ? { trainerId: '', dateOfBirth: '' } : {}),
  };

  const [formData, setFormData] = useState<RegisterFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;
  const validatePhone = (phone: string) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone);

  const debouncedValidate = useMemo(
    () =>
      debounce((data: RegisterFormData) => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!data.name.trim()) newErrors.name = 'Name is required';
        else if (data.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

        if (!data.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(data.email)) newErrors.email = 'Invalid email';

        if (!data.password) newErrors.password = 'Password is required';
        else if (!validatePassword(data.password)) newErrors.password = 'At least 8 characters';

        if (!data.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
        else if (data.password !== data.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (!data.contactNumber) newErrors.contactNumber = 'Contact number is required';
        else if (!validatePhone(data.contactNumber)) newErrors.contactNumber = 'Invalid phone number';

        if (role === 'client' && !data.trainerId?.trim()) newErrors.trainerId = 'Trainer ID is required';

        setErrors(newErrors);
      }, 300),
    [role]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData(updated);
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    debouncedValidate(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedValidate.flush();

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    onSubmit(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = role === 'trainer' ? '/dashboard/trainer' : '/dashboard/client';
      window.location.href = redirect;
    }
  }, [isAuthenticated, role]);

  const copy = role === 'trainer'
    ? {
        title: 'Create Trainer Account',
        subtitle: 'Join CoachPad to manage clients and meal plans',
        buttonText: 'Create Trainer Account',
        footerText: 'Already have an account?',
        loginLink: '/login',
      }
    : {
        title: 'Create Client Account',
        subtitle: 'Register to access your personalized plans',
        buttonText: 'Create Client Account',
        footerText: 'Already have an account?',
        loginLink: '/login',
      };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <h1 className={classes.title}>{copy.title}</h1>
          <p className={classes.subtitle}>{copy.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          {/* Name */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Full Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${classes.input} ${errors.name ? classes.inputError : ''}`}
              placeholder="John Doe"
              disabled={isPending}
            />
            {errors.name && <span className={classes.errorMessage}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Email Address *</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
              placeholder="email@example.com"
              type="email"
              disabled={isPending}
            />
            {errors.email && <span className={classes.errorMessage}>{errors.email}</span>}
          </div>

          {/* Contact Number */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Contact Number *</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`${classes.input} ${errors.contactNumber ? classes.inputError : ''}`}
              placeholder="+1 234 567 890"
              disabled={isPending}
            />
            {errors.contactNumber && <span className={classes.errorMessage}>{errors.contactNumber}</span>}
          </div>

          {/* Password */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Password *</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
              placeholder="Password"
              disabled={isPending}
            />
            {errors.password && <span className={classes.errorMessage}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Confirm Password *</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${classes.input} ${errors.confirmPassword ? classes.inputError : ''}`}
              placeholder="Confirm Password"
              disabled={isPending}
            />
            {errors.confirmPassword && <span className={classes.errorMessage}>{errors.confirmPassword}</span>}
          </div>

          {/* Trainer ID (Client only) */}
          {role === 'client' && (
            <div className={classes.inputGroup}>
              <label className={classes.label}>Trainer ID *</label>
              <input
                name="trainerId"
                value={formData.trainerId}
                onChange={handleChange}
                className={`${classes.input} ${errors.trainerId ? classes.inputError : ''}`}
                placeholder="Trainer123"
                disabled={isPending}
              />
              {errors.trainerId && <span className={classes.errorMessage}>{errors.trainerId}</span>}
            </div>
          )}

          {/* Avatar (optional) */}
          <div className={classes.inputGroup}>
            <label className={classes.label}>Avatar URL</label>
            <input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className={classes.input}
              placeholder="https://example.com/avatar.jpg"
              disabled={isPending}
            />
          </div>

          {/* Terms */}
          <div className={classes.inputGroup}>
            <label className={classes.checkboxLabel}>
              <input
                name="policiesAccepted"
                type="checkbox"
                checked={formData.policiesAccepted}
                onChange={handleChange}
                disabled={isPending}
              />
              I agree to the Terms of Service
            </label>
          </div>

          {/* Errors / Success */}
          {isError && <div className={classes.globalError}>{errorMessage || 'Registration failed.'}</div>}
          {isSuccess && !isAuthenticated && (
            <div className={classes.successMessage}>Registration successful! Redirecting...</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`${classes.button} ${classes.registerButton}`}
            disabled={
              isPending || !formData.policiesAccepted || Object.values(errors).some(Boolean)
            }
          >
            {isPending ? 'Creating Account...' : copy.buttonText}
          </button>
        </form>

        <div className={classes.footer}>
          {copy.footerText}{' '}
          <a href={copy.loginLink} className={classes.link}>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default UniversalRegisterForm;
