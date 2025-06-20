// src/styles/dashboardStyles.ts
'use client';

import { createUseStyles } from 'react-jss';

const COLORS = {
  background: '#f9fafb',
  card: 'white',
  title: '#1f2937',
  text: '#374151',
  subtext: '#4b5563',
  lightGray: '#e5e7eb',
  statBg: '#e0f2fe',
  statText: '#0c4a6e',
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  success: '#10b981',
  successHover: '#059669',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  zebraStripe: '#f9fafc',
};

const FONT = {
  base: '0.95rem',
  sm: '0.875rem',
  lg: '1.25rem',
  xl: '1.5rem',
};

export const useDashboardStyles = createUseStyles({
  container: {
    backgroundColor: COLORS.background,
    minHeight: '100vh',
    padding: '2rem',
    boxSizing: 'border-box',
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  sectionTitle: {
    fontSize: FONT.xl,
    fontWeight: 700,
    marginBottom: '1rem',
    color: COLORS.title,
  },
  subtleText: {
    color: COLORS.subtext,
    fontSize: FONT.sm,
    margin: '0.25rem 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  statBox: {
    backgroundColor: COLORS.statBg,
    padding: '1.25rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1.1rem',
    color: COLORS.statText,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  statIcon: {
    fontSize: FONT.lg,
    marginBottom: '0.5rem',
    display: 'block',
  },
  activityList: {
    listStyle: 'none',
    paddingLeft: 0,
    fontSize: FONT.base,
    color: COLORS.text,
    lineHeight: '1.75rem',
    '& li': {
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
  },
  activityIcon: {
    color: COLORS.success,
    fontSize: FONT.lg,
  },
  buttonRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
    '@media (max-width: 500px)': {
      flexDirection: 'column',
    },
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: FONT.base,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: COLORS.primaryHover,
    },
  },
  secondaryButton: {
    backgroundColor: COLORS.success,
    '&:hover': {
      backgroundColor: COLORS.successHover,
    },
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
    '&:hover': {
      backgroundColor: COLORS.dangerHover,
    },
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: COLORS.primary,
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: COLORS.primaryHover,
    },
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: FONT.base,
  },
  th: {
    backgroundColor: '#f3f4f6',
    padding: '0.75rem',
    textAlign: 'left',
    fontWeight: 600,
    color: COLORS.text,
    borderBottom: `1px solid ${COLORS.lightGray}`,
  },
  td: {
    padding: '0.75rem',
    borderBottom: `1px solid ${COLORS.lightGray}`,
    color: COLORS.subtext,
  },
  clientTableWrapper: {
    marginTop: '1rem',
  },
  clientTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: FONT.base,
    '& tr:nth-child(even)': {
      backgroundColor: COLORS.zebraStripe,
    },
    '& th, & td': {
      padding: '0.75rem',
      textAlign: 'left',
      borderBottom: `1px solid ${COLORS.lightGray}`,
    },
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '0.75rem 0',
    borderBottom: `1px solid ${COLORS.lightGray}`,
    fontSize: FONT.base,
    color: COLORS.text,
  },
  formSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: COLORS.card,
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: FONT.lg,
    fontWeight: 600,
    marginBottom: '1rem',
    color: COLORS.title,
  },
  formInput: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: FONT.base,
    borderRadius: '0.375rem',
    border: `1px solid ${COLORS.lightGray}`,
    boxSizing: 'border-box',
    outline: 'none',
    '&:focus': {
      borderColor: COLORS.primary,
      boxShadow: `0 0 0 1px ${COLORS.primary}`,
    },
    '@media (max-width: 500px)': {
      fontSize: FONT.sm,
    },
  },
  formLabel: {
    fontSize: FONT.sm,
    fontWeight: 500,
    color: COLORS.subtext,
    marginBottom: '0.25rem',
    display: 'block',
  },
  statusMessage: {
    marginTop: '1rem',
    fontSize: FONT.base,
    fontWeight: 500,
    color: COLORS.text,
  },

  // ✅ Added missing style
  clientGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
});
