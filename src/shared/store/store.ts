import { configureStore, combineReducers } from '@reduxjs/toolkit';
import questionsReducer from './questions/questionsSlice';
import modalsReducer from './modals/modalsSlice';
import {
  loadStateFromLocalStorage,
  localStorageMiddleware,
} from './preloadState';

const rootReducer = combineReducers({
  questions: questionsReducer,
  modals: modalsReducer,
});

const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
