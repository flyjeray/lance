import { Link, useParams } from 'react-router';
import { useClient, useClientOrders } from '../hooks/query';
import { Box, List, ListItem, Paper, Typography } from '@mui/material';

export const ClientPage = () => {
  const { id } = useParams();
  const { data: client } = useClient({ id: id as string });
  const { data: orders } = useClientOrders({
    id: id as string,
    page: '1',
    perPage: '10',
  });

  if (!client) return <p>No data</p>;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h2">{client.data.name}</Typography>
      {orders?.data.length === 0 && <Typography>No orders</Typography>}
      <List component={Paper}>
        {orders?.data.map((order) => (
          <ListItem>
            <Link
              to={{
                pathname: `/order/${order._id}`,
              }}
            >
              <Typography>{order.title}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
