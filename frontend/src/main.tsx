import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { LOCALSTORAGE_TOKEN_PATH } from './api';
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
import { Layout } from './components/Layout';

const Protected = () => {
  const token =
    useAppSelector((state) => state.authSlice.token) ||
    localStorage.getItem(LOCALSTORAGE_TOKEN_PATH);

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

const AuthHandler = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    const storageToken = window.localStorage.getItem(LOCALSTORAGE_TOKEN_PATH);
    if (storageToken) {
      dispatch(AuthActions.setToken(storageToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(AuthActions.fetchMe());
      dispatch(ClientActions.fetchNames());
    }
  }, [token]);

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
