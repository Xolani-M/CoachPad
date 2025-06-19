'use client';

import React, { useEffect } from 'react';
import {
  TrainerDashboardProvider,
  useTrainerDashboardActions,
  useTrainerDashboardState,
} from '@/providers/trainerDashboard';

const TrainerDashboardContent = () => {
  const { getCurrentTrainer } = useTrainerDashboardActions();
  const { isPending, isError, isSuccess, currentTrainer } = useTrainerDashboardState();

  useEffect(() => {
    getCurrentTrainer();
  }, [getCurrentTrainer]);

  if (isPending) return <p>Loading your dashboard...</p>;
  if (isError) return <p>Failed to load trainer info. Please try again later.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trainer Dashboard</h1>

      {isSuccess && currentTrainer ? (
        <div style={{ marginTop: '1rem' }}>
          <h2>Welcome, {currentTrainer.name}!</h2>
          <p><strong>Email:</strong> {currentTrainer.email}</p>
          <p><strong>Role:</strong> {currentTrainer.role}</p>
          {currentTrainer.contactNumber && (
            <p><strong>Contact:</strong> {currentTrainer.contactNumber}</p>
          )}
        </div>
      ) : (
        <p>No trainer data available.</p>
      )}
    </div>
  );
};

const TrainerDashboard = () => (
  <TrainerDashboardProvider>
    <TrainerDashboardContent />
  </TrainerDashboardProvider>
);

export default TrainerDashboard;
