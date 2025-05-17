import { Box, Button, TextField } from '@mui/material';
import { useLogin } from '../../hooks/query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthCredentials } from '@lance/shared/models/api/auth';

export const LoginForm = () => {
  const { mutateAsync: auth } = useLogin();
  const { register, handleSubmit } = useForm<AuthCredentials>();

  const handleLogin: SubmitHandler<AuthCredentials> = (data) => {
    const { login, password } = data;
    auth({ login, password });
  };

  return (
    <Box
      display="flex"
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      flexDirection="column"
      gap={3}
    >
      <TextField
        type="text"
        id="login"
        placeholder="Login"
        required
        {...register('login')}
      />
      <TextField
        type="password"
        id="password"
        placeholder="Password"
        required
        {...register('password')}
      />
      <Button type="submit">Login</Button>
    </Box>
  );
};
