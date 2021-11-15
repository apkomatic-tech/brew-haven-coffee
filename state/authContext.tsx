import { createContext, useEffect, useReducer, useState } from 'react';
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { app } from '../getFirebaseApp';

type AuthContextProps = {
  state: {
    user: any;
    error: any;
  };
  signInUser: any;
  signOutUser: any;
};
type AuthContextProviderProps = {
  children: React.ReactNode;
};
const AuthContext = createContext<AuthContextProps>({
  state: { user: {}, error: {} },
  signInUser: () => {},
  signOutUser: () => {}
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, setAuthState] = useState({ user: {}, error: {} });
  const auth = getAuth(app);

  function signInUser({ email, password }: { email: string; password: string }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        console.log('Sign in successful.');
        // const user = userCredential.user
        // setAuthState({
        //   ...authState,
        //   user,
        //   error: null
        // });
      })
      .catch((err) => {
        setAuthState({
          ...authState,
          error: err
        });
      });
  }

  function signOutUser() {
    auth
      .signOut()
      .then(() => {
        console.log('Sign out successful.');
      })
      .catch((err) => {
        console.error('Sign out failed.');
        setAuthState({
          ...authState,
          error: err
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
          error: {}
        });
      } else {
        console.log('user is signed out.');
        setAuthState({
          ...authState,
          user: {},
          error: {}
        });
      }
    });
  }, [auth]);

  return <AuthContext.Provider value={{ state: authState, signInUser, signOutUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
