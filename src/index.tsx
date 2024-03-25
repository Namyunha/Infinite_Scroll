import './css/index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '../src/css/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalStyle/>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
