import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AuthActions } from './redux/slices/auth';
import {
  ClientPage,
  ClientTablePage,
  DashboardPage,
  HomePage,
  OrderPage,
} from './pages';
import { OrdersTablePage } from './pages/OrdersTable';
import { ClientActions } from './redux/slices/clients';
import { Layout } from './components';

const Protected = () => {
  const { me, isLoaded } = useAppSelector((state) => state.authSlice);

  if (!me && isLoaded) {
    return <Navigate to="/" />;
  } else {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
};

const AuthHandler = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(AuthActions.fetchMe());
  }, []);

  useEffect(() => {
    if (me) {
      dispatch(ClientActions.fetchNames());
    }
  }, [me]);

  return null;
};

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <AuthHandler />
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
      </Provider>
    </StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
