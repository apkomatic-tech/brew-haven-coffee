import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';

import { app } from '../getFirebaseApp';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthUser } from '../features/auth/auth.slice';

const auth = getAuth(app);

const Page: React.FC<{ children: React.ReactChild }> = ({ children }) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(authUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setAuthUser(user));
    });
  }, [dispatch]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default Page;
