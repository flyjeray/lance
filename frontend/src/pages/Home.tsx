import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AuthActions } from '../redux/slices/auth';
import { useEffect } from 'react';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.authSlice);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    dispatch(AuthActions.login({ login, password }))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      });
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="Login"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
