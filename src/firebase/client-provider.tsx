'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { getFirebaseApp } from './config';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [instances, setInstances] = useState<{
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const auth = getAuth(app);
      setInstances({ firebaseApp: app, firestore: db, auth });
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
    }
  }, []);

  // During the first render and until the instances are ready, 
  // we provide nulls to avoid crashing destructuring assignments,
  // but we ensure the Provider is present.
  return (
    <FirebaseProvider 
      firebaseApp={instances?.firebaseApp as any} 
      firestore={instances?.firestore as any} 
      auth={instances?.auth as any}
    >
      {children}
    </FirebaseProvider>
  );
}