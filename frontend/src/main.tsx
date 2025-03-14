import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { HomePage } from './pages/Home';
import { LOCALSTORAGE_TOKEN_PATH } from './api';
import { DashboardPage } from './pages/Dashboard';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AuthActions } from './redux/slices/auth';

const Protected = () => {
  const token =
    useAppSelector((state) => state.authSlice.token) ||
    localStorage.getItem(LOCALSTORAGE_TOKEN_PATH);

  return token ? <Outlet /> : <Navigate to="/" />;
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
