import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import userReducer from './authSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
