import { createAction } from '@reduxjs/toolkit';

// Dispatched by base-query when refresh-token exchange failed.
// features/auth handles this in extraReducers and clears the state.
export const sessionExpired = createAction('session/expired');
