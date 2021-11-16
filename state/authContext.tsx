import { createContext, useEffect, useState } from 'react';
import router, { Router } from 'next/router';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { app } from '../getFirebaseApp';
import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';

// create context
type AuthContextProps = {
  state: {
    user: any;
    error: string;
  };
  signInUser: any;
  signOutUser: any;
  createUser: any;
};

const AuthContext = createContext<AuthContextProps>({
  state: { user: {}, error: '' },
  signInUser: () => {},
  signOutUser: () => {},
  createUser: () => {}
});

// create provider
type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, setAuthState] = useState({ user: {}, error: '' });
  const auth = getAuth(app);

  function signInUser({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/account');
      })
      .catch((err) => {
        setAuthState({
          ...authState,
          error: getAuthErrorMessageFromCode(err.code)
        });
      });
  }

  function signOutUser() {
    auth
      .signOut()
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        console.error('Sign out failed.');
        setAuthState({
          ...authState,
          error: getAuthErrorMessageFromCode(err.code)
        });
      });
  }

  function createUser({ email, password }: { email: string; password: string }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/account');
      })
      .catch((err) => {
        setAuthState({
          ...authState,
          error: getAuthErrorMessageFromCode(err.code)
        });
      });
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setAuthState({
        ...authState,
        error: ''
      });
    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          ...authState,
          user,
          error: ''
        });
      } else {
        setAuthState({
          ...authState,
          user: {},
          error: ''
        });
      }
    });
  }, []);

  return <AuthContext.Provider value={{ state: authState, signInUser, signOutUser, createUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
