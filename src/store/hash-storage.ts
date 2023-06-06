// refer to: https://docs.pmnd.rs/zustand/guides/connect-to-state-with-url-hash

import { StateStorage } from 'zustand/middleware';

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const storedValue = searchParams.get(key) ?? '';
    const storedValueJSON = JSON.parse(JSON.parse(storedValue));

    const storedParameters = JSON.stringify({
      state: {
        selectedType: storedValueJSON.state.type,
        currentPage: storedValueJSON.state.page,
        resultsPerPage: storedValueJSON.state.limit,
        resultsOffset: storedValueJSON.state.offset,
      },
    });
    return storedParameters;
  },
  setItem: (key, newValue): void => {
    const state = JSON.parse(newValue).state;

    const parametizedValues = JSON.stringify({
      state: {
        page: state.currentPage,
        limit: state.resultsPerPage,
        offset: state.resultsOffset,
        type: state.selectedType,
      },
    });

    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.set(key, JSON.stringify(parametizedValues));
    location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(location.hash.slice(1));
    searchParams.delete(key);
    location.hash = searchParams.toString();
  },
};

export default hashStorage;
