import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const contactsReducerConfig = {
  key: 'user',
  storage,
  whitelist: ['contacts'],
};

export const store = configureStore({
  reducer: {
    contactsData: persistReducer(contactsReducerConfig, contactsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
