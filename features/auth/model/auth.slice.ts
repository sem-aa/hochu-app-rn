import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { sessionExpired } from '@/shared/store/auth-events';
import { userApi } from '@/entities/user';
import type { User } from '@/entities/user';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sessionExpired, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addMatcher(userApi.endpoints.updateMe.matchFulfilled, (state, { payload }) => {
        if (state.user) {
          state.user = payload;
        }
      });
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
