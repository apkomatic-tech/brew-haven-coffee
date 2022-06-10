import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthError, User } from 'firebase/auth';

interface AuthState {
  authUser: User | null;
  authError: AuthError | null;
}

const initialState: AuthState = {
  authUser: null,
  authError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<User | null>) {
      state.authUser = action.payload;
    },
    setAuthError(state, action: PayloadAction<AuthError | null>) {
      state.authError = action.payload;
    }
  }
});

export const { setAuthUser, setAuthError } = authSlice.actions;
export default authSlice.reducer;
