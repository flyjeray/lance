import { useNavigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { LoginForm } from '../containers';

export const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <div>
      <h1>Home Page</h1>
      <LoginForm />
    </div>
  );
};
