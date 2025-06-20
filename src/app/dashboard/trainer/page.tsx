'use client';

import React, { useEffect, useState } from 'react';
import {
  TrainerDashboardProvider,
  useTrainerDashboardActions,
  useTrainerDashboardState,
} from '@/providers/trainerDashboard';
import { useAuthActions } from '@/providers/authProvider';
import { useDashboardStyles } from '@/styles/dashboardStyles';

const TrainerDashboardContent = () => {
  const classes = useDashboardStyles();
  const { getCurrentTrainer, getClientsForTrainer } = useTrainerDashboardActions();
  const { createClient, logout } = useAuthActions();
  const { isPending, isError, isSuccess, currentTrainer, clients } = useTrainerDashboardState();

  const [clientSuccessMessage, setClientSuccessMessage] = useState<string | null>(null);
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientData, setClientData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    sex: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    getCurrentTrainer();
  }, [getCurrentTrainer]);

  useEffect(() => {
    if (currentTrainer?.id) {
      getClientsForTrainer(currentTrainer.id);
    }
  }, [currentTrainer?.id, getClientsForTrainer]);

  const handleCreateClient = async () => {
    try {
      if (!currentTrainer?.id) {
        throw new Error('Trainer ID missing');
      }

      const payload = { ...clientData, trainerId: currentTrainer.id };
      console.log('🚨 Creating client with payload:', payload);

      await createClient(payload);

      setClientSuccessMessage('Client created successfully!');
      setClientData({
        fullName: '',
        email: '',
        contactNumber: '',
        sex: '',
        dateOfBirth: '',
      });
      setShowClientForm(false);

      await getClientsForTrainer(currentTrainer.id);

      setTimeout(() => setClientSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Client creation failed:', err);
    }
  };

  if (isPending) return <p>Loading your dashboard...</p>;
  if (isError) return <p>Failed to load trainer info. Please try again later.</p>;

  return (
    <div className={classes.container}>
      <div className={classes.headerRow}>
        <h1 className={classes.sectionTitle}>Trainer Dashboard</h1>
        <button className={`${classes.button} ${classes.logoutButton}`} onClick={logout}>
          Logout
        </button>
      </div>

      {isSuccess && currentTrainer && (
        <>
          <div className={classes.statsGrid}>
            <div className={classes.statBox}>
              <div className={classes.statIcon}>👥</div>
              {clients.length} Clients
            </div>
            <div className={classes.statBox}>
              <div className={classes.statIcon}>📋</div>
              0 Meal Plans
            </div>
          </div>

          <div className={classes.card}>
            <h2 className={classes.sectionTitle}>
              Welcome, <span style={{ color: '#1f2937' }}>{currentTrainer.name}</span>!
            </h2>
            <p className={classes.subtleText}><strong>Email:</strong> {currentTrainer.email}</p>
            <p className={classes.subtleText}><strong>Role:</strong> {currentTrainer.role}</p>
            {currentTrainer.contactNumber && (
              <p className={classes.subtleText}><strong>Contact:</strong> {currentTrainer.contactNumber}</p>
            )}

            <div className={classes.buttonRow}>
              <button className={classes.button} onClick={() => setShowClientForm(!showClientForm)}>
                {showClientForm ? 'Cancel' : 'Create New Client'}
              </button>
            </div>

            {showClientForm && (
              <div className={classes.formSection}>
                <h3 className={classes.formTitle}>Create Client</h3>

                {clientSuccessMessage && (
                  <div className={classes.statusMessage} style={{ color: 'green' }}>
                    {clientSuccessMessage}
                  </div>
                )}

                {['fullName', 'email', 'contactNumber', 'sex', 'dateOfBirth'].map((field) => (
                  <div key={field}>
                    <label className={classes.formLabel}>
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      className={classes.formInput}
                      type={field === 'dateOfBirth' ? 'date' : 'text'}
                      value={clientData[field as keyof typeof clientData]}
                      onChange={(e) =>
                        setClientData({ ...clientData, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}

                <button className={classes.actionButton} onClick={handleCreateClient}>
                  Submit Client
                </button>
              </div>
            )}
          </div>

          {clients.length > 0 && (
            <div className={classes.clientGrid}>
              {clients.map((client) => (
                <div key={client.clientId || client.id} className={classes.card}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{client.fullName}</h3>
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Contact:</strong> {client.contactNumber}</p>
                  <p><strong>Sex:</strong> {client.sex}</p>
                  <p><strong>DOB:</strong> {client.dateOfBirth}</p>
                </div>
              ))}
            </div>
          )}
        </>
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
