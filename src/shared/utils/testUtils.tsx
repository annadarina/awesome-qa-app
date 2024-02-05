import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ThemeProvider from '../context/ThemeProvider';
import { rootReducer, RootState } from '../store/store';
import { configureStore } from '@reduxjs/toolkit';

export const renderWrapper = (
  children: React.ReactNode,
  options: { mockData: RootState }
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: options.mockData,
  });

  render(
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};
