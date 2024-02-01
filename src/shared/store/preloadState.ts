const STORAGE_KEY = 'appState';

export const localStorageMiddleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
    return result;
  };

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};
