import { configureStore, combineReducers } from '@reduxjs/toolkit';
import questionsReducer from './questions/questionsSlice';
import modalsReducer from './modals/modalsSlice';
import {
  loadStateFromLocalStorage,
  localStorageMiddleware,
} from './preloadState';

export const rootReducer = combineReducers({
  questions: questionsReducer,
  modals: modalsReducer,
});

// For demo purpose only!
// I created a preloaded state from the local storage to simulate saving
// and showing data from API
// In real life it's unlikely you would need to store the whole
// state of application in the redux store
const preloadedState = {
  ...loadStateFromLocalStorage(),
  modals: { currentModal: null, modalProps: {} },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
