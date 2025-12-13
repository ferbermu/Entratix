import { configureStore } from '@reduxjs/toolkit';
import eventFormReducer from './slices/eventFormSlice';

export const store = configureStore({
  reducer: {
    eventForm: eventFormReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar acciones que no son serializables (como funciones)
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

