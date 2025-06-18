'use client';

import React from 'react';
import Image from 'next/image';
import useLandingPageStyles from '@/styles/LandingPagesStyles';
import CoachPadLogo from '@/../public/coachPadLogo.png';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const classes = useLandingPageStyles();
  const router = useRouter();

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.heroSection}>
        <div className={classes.heroCard}>
          <Image
            src={CoachPadLogo}
            alt="CoachPad Logo"
            width={90}
            height={90}
            className={classes.logoImage}
          />
          <h1 className={classes.title}>CoachPad</h1>
          <p className={classes.subtitle}>
            The ultimate platform for personal trainers to manage clients, meal plans, and success.
          </p>
          <div className={classes.ctaButtons}>
            <button
              className={classes.primaryButton}
              onClick={() => router.push('/login?role=trainer')}
            >
              Trainer Login
            </button>
            <button
              className={classes.secondaryButton}
              onClick={() => router.push('/login?role=client')}
            >
              Client Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
