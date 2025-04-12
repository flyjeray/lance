import { Box } from '@mui/material';
import { ClientCreateForm, OrderCreateForm } from '../containers';

export const DashboardPage = () => {
  return (
    <Box display="flex" flexDirection="row" gap={3}>
      <OrderCreateForm />
      <ClientCreateForm />
    </Box>
  );
};
