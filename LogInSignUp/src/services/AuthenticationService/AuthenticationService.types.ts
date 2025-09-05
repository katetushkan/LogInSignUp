export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthenticationService<T> {
  authenticate(credentials: ICredentials): Promise<T>;
}
