import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LoginForm } from '../containers';
import { useMe } from '../hooks/query';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();

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
