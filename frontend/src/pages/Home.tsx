import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LoginForm } from '../containers';
import { useMe } from '../hooks/query';
import { Box, Typography } from '@mui/material';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();

  useEffect(() => {
    if (me) {
      navigate('/dashboard');
    }
  }, [me]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h1" mb={4}>
        Lance
      </Typography>
      <LoginForm />
    </Box>
  );
};
