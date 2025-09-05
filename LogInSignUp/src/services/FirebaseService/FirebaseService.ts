import { firebaseConfig } from './config.ts';
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

interface IFirebaseService {
  getAuth: () => Auth
}

class FirebaseService implements IFirebaseService {
  app;

  constructor() {
    this.app = initializeApp(firebaseConfig);
  }

  getAuth() {
    return getAuth();
  }
}

export const firebaseService = new FirebaseService();
