import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { ReactQueryProvider } from '@frontend/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
