import { useNavigate } from 'react-router';
import { Button, Input } from '../../components';
import { useAppDispatch } from '../../redux/hooks';
import { AuthActions } from '../../redux/slices/auth';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" id="login" name="login" placeholder="Login" required />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <Button type="submit" label="Login" />
    </form>
  );
};
