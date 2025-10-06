import { configureStore } from '@reduxjs/toolkit';
import yantraReducer from './yantraSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    yantra: yantraReducer,
    ui: uiReducer,
  },
});