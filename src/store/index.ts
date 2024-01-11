import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
