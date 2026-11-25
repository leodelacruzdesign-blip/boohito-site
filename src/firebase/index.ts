
'use client';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseApp } from './config';

/**
 * Initializes Firebase services. 
 * This should ONLY be called in Client Components or hooks.
 */
export function initializeFirebase() {
  const firebaseApp = getFirebaseApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return { firebaseApp, firestore, auth };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
