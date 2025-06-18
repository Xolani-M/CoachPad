import { createUseStyles } from 'react-jss';

const useLandingPageStyles = createUseStyles({
  pageWrapper: {
    composes: 'pageWrapper',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    padding: '2rem',
  },
  heroSection: {
    width: '100%',
    maxWidth: '600px',
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  logoImage: {
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#4b5563',
    marginBottom: '2rem',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#1e40af',
    },
  },
  secondaryButton: {
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    border: '2px solid #3b82f6',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#c7d2fe',
    },
  },
});

export default useLandingPageStyles;
