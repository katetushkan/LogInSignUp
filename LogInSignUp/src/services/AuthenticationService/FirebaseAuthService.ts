import type { IAuthenticationService, ICredentials } from './AuthenticationService.types.ts';
import { firebaseService } from '../FirebaseService/FirebaseService.ts';
import { type Auth, type UserCredential, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


class FirebaseAuthService implements IAuthenticationService<UserCredential> {
  private readonly auth: Auth;

  constructor() {
    this.auth = firebaseService.getAuth();
  }

  authenticate({ email, password }: ICredentials) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogleProvider({ email }: { email: string }) {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': email,
    });

    return signInWithPopup(this.auth, provider);
  }
}

export const firebaseAuthService = new FirebaseAuthService();
