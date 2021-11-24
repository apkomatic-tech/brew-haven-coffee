import { createContext, useEffect, useState } from 'react';
import router, { Router } from 'next/router';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserProfile } from 'firebase/auth';

import { app } from '../getFirebaseApp';
import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';
import { User, UserCredential } from '@firebase/auth-types';

// initialize auth
const auth = getAuth(app);

// create context
type AuthContextProps = {
  authUser: User | null;
  authError: string;
  signIn: any;
  signOut: any;
  createUser: any;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: '',
  signIn: () => {},
  signOut: () => {},
  createUser: () => {}
});

// create provider
type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [authError, setAuthError] = useState('');

  function signIn({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/account');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function createUser({ email, password }: { email: string; password: string }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/account');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setAuthError('');
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ authUser: user, authError, signIn, signOut, createUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
