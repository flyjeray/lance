import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import {
  ClientPage,
  ClientTablePage,
  DashboardPage,
  HomePage,
  OrderPage,
} from './pages';
import { OrdersTablePage } from './pages/OrdersTable';
import { Layout } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMe } from './hooks/query';

const Protected = () => {
  const { isError } = useMe();

  if (isError) {
    return <Navigate to="/" />;
  } else {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<Protected />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/client/:id" element={<ClientPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/clients/:page" element={<ClientTablePage />} />
              <Route path="/orders/:page" element={<OrdersTablePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
