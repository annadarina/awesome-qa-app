import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';

const rootReducer = {
  questions: questionsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
