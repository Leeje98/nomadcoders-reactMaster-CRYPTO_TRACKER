import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useSetRecoilState } from "recoil";
import { isDarkAtom } from './routes/atoms';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
 
