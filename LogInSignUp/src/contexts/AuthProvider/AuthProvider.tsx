import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const ACCESS_TOKEN_LOCAL_STORAGE = 'accessToken';
const USER_EMAIL_LOCAL_STORAGE = 'email';

type AccessToken = string;

interface IAuthContext {
  token: AccessToken | undefined;
  authenticate: (token: AccessToken) => void;
  logout: () => void;
  rememberEmail: (email: string) => void;
  email: string | undefined;
}

interface IContextProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: undefined,
  email: undefined,
  rememberEmail: () => {},
  authenticate: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: IContextProps) {
  const [token, setToken] = useState<AccessToken | undefined>(undefined);

  useEffect(() => {
    const prevToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);

    if (!prevToken) return;

    setToken(prevToken);
  }, []);

  const setAuthToken = useCallback((token: AccessToken | undefined) => {
    setToken(token);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
  }, []);

  const rememberEmail = useCallback((email: string) => {
    localStorage.setItem(USER_EMAIL_LOCAL_STORAGE, email);
  }, []);

  const email = useMemo(() => {
    return localStorage.getItem(USER_EMAIL_LOCAL_STORAGE) || undefined;
  }, []);

  const initValue: IAuthContext = useMemo(() => {
    return {
      token,
      logout,
      rememberEmail,
      email,
      authenticate: setAuthToken
    }
  }, [token, setAuthToken, logout, rememberEmail, email]);

  return (
    <AuthContext.Provider value={initValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthToken = () => useContext(AuthContext);

