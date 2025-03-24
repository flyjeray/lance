import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { clientSlice } from './slices/clients';

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    clientSlice: clientSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
