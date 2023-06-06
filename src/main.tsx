import React from 'react';
import ReactDOM from 'react-dom/client';

import { SWRConfig } from 'swr';
import localStorageProvider from './lib/local-storage-provider.ts';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{ provider: localStorageProvider }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
