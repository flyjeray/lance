import { Button, Input } from '../../components';
import { useLogin } from '../../hooks/query';

export const LoginForm = () => {
  const { mutateAsync: auth } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    auth({ login, password });
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
