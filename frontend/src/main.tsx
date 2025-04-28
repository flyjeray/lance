import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import {
  ClientPage,
  ClientTablePage,
  HomePage,
  OrderPage,
  StatusesTablePage,
} from './pages';
import { OrdersTablePage } from './pages/OrdersTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMe } from './hooks/query';
import { ProtectedLayout } from './containers';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

const Protected = () => {
  const { isError } = useMe();

  if (isError) {
    return <Navigate to="/" />;
  } else {
    return <ProtectedLayout />;
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
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route element={<Protected />}>
                <Route path="/client/:id" element={<ClientPage />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/clients/:page" element={<ClientTablePage />} />
                <Route path="/orders/:page" element={<OrdersTablePage />} />
                <Route path="/statuses" element={<StatusesTablePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
