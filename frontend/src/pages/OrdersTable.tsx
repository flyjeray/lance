import { Link, useNavigate, useParams } from 'react-router';
import {
  useChangeOrderStatus,
  useClientNameDictionary,
  useOrderList,
  useStatusList,
} from '../hooks/query';
import {
  Box,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TableFilter } from '../containers';
import {
  SingleTableFilterProps,
  TableFilterFieldType,
} from '../containers/TableFilter/types';
import { useState } from 'react';
import { GetFilteredOrdersPayload } from '@lance/shared/models/api/orders';

export const OrdersTablePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<GetFilteredOrdersPayload>({});

  const { data: clients } = useClientNameDictionary();
  const { data: statuses } = useStatusList();
  const { data: orders } = useOrderList({ page, perPage: '5', ...filters });
  const { mutateAsync: changeStatus } = useChangeOrderStatus();

  const filterElements: SingleTableFilterProps[] = [
    {
      type: TableFilterFieldType.Select,
      label: 'Client',
      options: Object.entries(clients?.data || {}).map(([id, name]) => ({
        label: name,
        value: id,
      })),
      onChange: (id) => setFilters((prev) => ({ ...prev, clientID: id })),
    },
    {
      type: TableFilterFieldType.Number,
      label: 'Minimal Price',
      onChange: (price) => setFilters((prev) => ({ ...prev, minPrice: price })),
    },
    {
      type: TableFilterFieldType.Number,
      label: 'Maximal Price',
      onChange: (price) => setFilters((prev) => ({ ...prev, maxPrice: price })),
    },
    {
      type: TableFilterFieldType.Select,
      label: 'Status',
      options:
        statuses?.data.map((status) => ({
          label: status.label,
          value: status._id.toString(),
        })) || [],
      onChange: (statusID) => setFilters((prev) => ({ ...prev, statusID })),
    },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <TableFilter filters={filterElements} />

      {!orders?.data && <Typography>No orders yet</Typography>}

      {orders?.data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders?.data.map((order) => {
                return (
                  <TableRow
                    key={`row-order-${order._id}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={{ pathname: `/order/${order._id}` }}>
                        {order.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      {order.description || '-'}
                    </TableCell>
                    <TableCell align="left">
                      {order.price ? `${order.price}` : '-'}
                    </TableCell>
                    <TableCell align="left">
                      <Link to={{ pathname: `/client/${order.client_id}` }}>
                        {clients?.data[order.client_id.toString()]}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Select
                        defaultValue={order.status_id?.toString()}
                        onChange={(event) => {
                          changeStatus({
                            orderID: order._id.toString(),
                            newStatusID: event.target.value,
                          });
                        }}
                      >
                        {statuses?.data.map((status) => (
                          <MenuItem value={status._id.toString()}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {orders?.pagination && (
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
