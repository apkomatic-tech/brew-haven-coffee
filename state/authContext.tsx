import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { app } from '../getFirebaseApp';
import router from 'next/router';

type AuthContextProps = {
  state: {
    user: any;
    error: string;
  };
  signInUser: any;
  signOutUser: any;
  createUser: any;
};
type AuthContextProviderProps = {
  children: React.ReactNode;
};

function getAuthErrorMessageFromCode(code: string) {
  switch (code) {
    case 'auth/user-not-found':
      return 'Error: User Not Found.';
    case 'auth/wrong-password':
      return 'Error: Wrong Password.';
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      return 'Error: Email Already Exists.';
    default:
      return 'Error: Unknown';
  }
}

const AuthContext = createContext<AuthContextProps>({
  state: { user: {}, error: '' },
  signInUser: () => {},
  signOutUser: () => {},
  createUser: () => {}
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, setAuthState] = useState({ user: {}, error: '' });
  const auth = getAuth(app);

  function signInUser({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
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
        console.log(err.code);
        setAuthState({
          ...authState,
          error: getAuthErrorMessageFromCode(err.code)
        });
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user is signed in.');
        setAuthState({
          ...authState,
          user,
          error: ''
        });
      } else {
        console.log('user is signed out.');
        setAuthState({
          ...authState,
          user: {},
          error: ''
        });
      }
    });
  }, [auth]);

  return <AuthContext.Provider value={{ state: authState, signInUser, signOutUser, createUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
