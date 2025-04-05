import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LoginForm } from '../containers';
import { useAppSelector } from '../redux/hooks';

export const HomePage = () => {
  const navigate = useNavigate();
  const { me } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (me) {
      navigate('/dashboard');
    }
  }, [me]);

  return (
    <div>
      <h1>Home Page</h1>
      <LoginForm />
    </div>
  );
};
