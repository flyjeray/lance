import { Link, useNavigate, useParams } from 'react-router';
import { useClientNameDictionary, useOrderList } from '../hooks/query';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const OrdersTablePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { data: clients } = useClientNameDictionary();
  const { data: orders } = useOrderList({ page, perPage: '5' });

  if (!orders) return <p>No data</p>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Is Completed</TableCell>
              <TableCell align="left">Client</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.data.map((order) => (
              <TableRow
                key={`row-order-${order._id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={{ pathname: `/order/${order._id}` }}>
                    {order.title}
                  </Link>
                </TableCell>
                <TableCell align="left">{order.description || '-'}</TableCell>
                <TableCell align="left">
                  {order.price ? `${order.price}` : '-'}
                </TableCell>
                <TableCell align="left">
                  {order.is_completed ? 'Yes' : 'No'}
                </TableCell>
                <TableCell align="left">
                  <Link to={{ pathname: `/client/${order.client_id}` }}>
                    {clients?.data[order.client_id.toString()]}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {orders.pagination && (
        <Pagination
          page={orders.pagination.page}
          count={orders.pagination.totalPages}
          onChange={(_, page) => {
            navigate(`/orders/${page}`);
          }}
        />
      )}
    </Box>
  );
};
