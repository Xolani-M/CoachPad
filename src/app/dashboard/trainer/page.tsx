'use client';

import React, { useEffect } from 'react';
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

  const [clientSuccessMessage, setClientSuccessMessage] = React.useState<string | null>(null);
  const [showClientForm, setShowClientForm] = React.useState(false);
  const [clientData, setClientData] = React.useState({
    fullName: '',
    email: '',
    contactNumber: '',
    sex: '',
    dateOfBirth: '',
    trainerId: '',
  });

  console.log('📦 Trainer State:', {
    isPending,
    isError,
    isSuccess,
    currentTrainer,
    clients,
  });

  useEffect(() => {
    getCurrentTrainer();
  }, [getCurrentTrainer]);

  useEffect(() => {
    if (currentTrainer?.id) {
      getClientsForTrainer(currentTrainer.id);
    }
  }, [currentTrainer?.id, getClientsForTrainer]);

  useEffect(() => {
    if (clients.length) {
      console.log('[👥 Clients fetched]', clients);
    }
  }, [clients]);

  const handleCreateClient = async () => {
    try {
      if (!currentTrainer?.id) throw new Error('Trainer ID missing');

      await createClient({
        ...clientData,
        trainerId: currentTrainer.id,
      });

      setClientSuccessMessage('Client created successfully!');
      setClientData({
        fullName: '',
        email: '',
        contactNumber: '',
        sex: '',
        dateOfBirth: '',
        trainerId: '',
      });
      setShowClientForm(false);
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
            <h2 className={classes.sectionTitle}>Welcome, {currentTrainer.name}!</h2>
            <p className={classes.subtleText}>
              <strong>Email:</strong> {currentTrainer.email}
            </p>
            <p className={classes.subtleText}>
              <strong>Role:</strong> {currentTrainer.role}
            </p>
            {currentTrainer.contactNumber && (
              <p className={classes.subtleText}>
                <strong>Contact:</strong> {currentTrainer.contactNumber}
              </p>
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

                <label className={classes.formLabel}>Full Name</label>
                <input
                  className={classes.formInput}
                  type="text"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                />

                <label className={classes.formLabel}>Email</label>
                <input
                  className={classes.formInput}
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                />

                <label className={classes.formLabel}>Contact Number</label>
                <input
                  className={classes.formInput}
                  type="text"
                  value={clientData.contactNumber}
                  onChange={(e) => setClientData({ ...clientData, contactNumber: e.target.value })}
                />

                <label className={classes.formLabel}>Sex</label>
                <input
                  className={classes.formInput}
                  type="text"
                  value={clientData.sex}
                  onChange={(e) => setClientData({ ...clientData, sex: e.target.value })}
                />

                <label className={classes.formLabel}>Date of Birth</label>
                <input
                  className={classes.formInput}
                  type="date"
                  value={clientData.dateOfBirth}
                  onChange={(e) => setClientData({ ...clientData, dateOfBirth: e.target.value })}
                />

                <button className={classes.actionButton} onClick={handleCreateClient}>
                  Submit Client
                </button>
              </div>
            )}
          </div>

          <div className={classes.card}>
            <h3 className={classes.sectionTitle}>Clients</h3>
            {clients.length === 0 ? (
              <p className={classes.subtleText}>
                No clients assigned yet.
              </p>
            ) : (
              <ul className={classes.list}>
                {clients.map((client) => (
                  <li key={client.clientId || client.id} className={classes.listItem}>
                    <div>
                      <strong
                        style={{ color: '#111827', fontSize: '1rem', display: 'block' }}
                      >
                        👤 {client.fullName}
                      </strong>
                      <span style={{ color: '#374151' }}>{client.email}</span>
                      <br />
                      <span style={{ color: '#4b5563' }}>{client.contactNumber}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
