import { Box, Divider, Drawer, MenuItem, Typography } from '@mui/material';
import { useLogout, useMe } from '../../hooks/query';
import { Outlet, useNavigate } from 'react-router';

export const ProtectedLayout = () => {
  const drawerWidth = 240;

  const { data: me } = useMe();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>Welcome, {me?.data.name}</Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
        <MenuItem onClick={() => navigate('/clients/1')}>Clients</MenuItem>
        <MenuItem onClick={() => navigate('/orders/1')}>Orders</MenuItem>
        <MenuItem onClick={() => navigate('/statuses')}>Statuses</MenuItem>

        <Divider />

        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
