import { firebaseAuthService } from '../../services/AuthenticationService/FirebaseAuthService.ts';
import type { ICredentials } from '../../services/AuthenticationService/AuthenticationService.types.ts';
import { type UserCredential } from 'firebase/auth';

interface IAuthUser {
  token: string;
}

interface IAuthRepository {
  authenticate(credentials: ICredentials): Promise<IAuthUser>;
  authenticateWithGoogle({ email }: { email: string }): Promise<IAuthUser>;
}

class AuthRepository implements IAuthRepository{
  private service;

  constructor() {
    this.service = firebaseAuthService;
  }

  async authenticate(credentials: ICredentials): Promise<IAuthUser> {
    const authResponse = await this.service.authenticate(credentials);

    return this.fromDTO(authResponse);
  };

  async authenticateWithGoogle({ email }: { email: string }): Promise<IAuthUser> {
    const authResponse = await this.service.loginWithGoogleProvider({ email });

    return this.fromDTO(authResponse);
  }

  private async fromDTO(response: UserCredential): Promise<IAuthUser> {
    const token = await response.user.getIdToken();

    return {
      token
    };
  };
}

export const authRepo = new AuthRepository();
