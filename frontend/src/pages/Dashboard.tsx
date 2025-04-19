import { Box } from '@mui/material';
import {
  ClientCreateForm,
  OrderCreateForm,
  StatusCreateForm,
} from '../containers';

export const DashboardPage = () => {
  return (
    <Box display="flex" flexDirection="row" gap={3}>
      <OrderCreateForm />
      <ClientCreateForm />
      <StatusCreateForm />
    </Box>
  );
};
