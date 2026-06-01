import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/shared/api/api';
import authReducer from '@/features/auth/model/auth.slice';
import wishCartReducer from '@/features/wish-cart/model/wish-cart.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    wishCart: wishCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
