import { Box, Button, Input, TextField } from '@mui/material';
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
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          type="text"
          id="login"
          name="login"
          placeholder="Login"
          required
        />
        <TextField
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </Box>
    </form>
  );
};
