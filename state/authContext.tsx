import { createContext, useEffect, useState } from 'react';
import router, { Router } from 'next/router';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { app } from '../getFirebaseApp';
import getAuthErrorMessageFromCode from '../utils/getAuthErrorMessageFromCode';
import { User } from '@firebase/auth-types';

// initialize auth
const auth = getAuth(app);

// create context
type AuthContextProps = {
  authUser: User | null;
  authError: string;
  signIn: any;
  signOut: any;
  createUser: any;
  signInWithGooglePopup: any;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  authError: '',
  signIn: () => {},
  signOut: () => {},
  createUser: () => {},
  signInWithGooglePopup: () => {}
});

// authentication providers
const googleProvider = new GoogleAuthProvider();

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
        router.push('/account/settings');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function signOut() {
    auth
      .signOut()
      .then(() => {
        router.push('/account/login');
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function createUser({ email, password, name }: { email: string; password: string; name?: string }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        // if user didn't provide name, redirect right away on successful registration
        if (!name) return router.push('/account/settings');

        // otherwise, update user profile with display name, then redirect regardless of success/fail
        updateProfile(authUser.user, {
          displayName: name
        })
          .then(() => router.push('/account/settings'))
          .catch((err) => {
            console.error('update profile error', err.message);
            router.push('/account/settings');
          });
      })
      .catch((err) => {
        setAuthError(getAuthErrorMessageFromCode(err.code));
      });
  }

  function signInWithGooglePopup() {
    signInWithPopup(auth, googleProvider)
        .then(() => {
          router.push('/account/settings');
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

  return <AuthContext.Provider value={{ authUser: user, authError, signIn, signOut, createUser, signInWithGooglePopup }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
