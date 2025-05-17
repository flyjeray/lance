import { Link, useNavigate, useParams } from 'react-router';
import {
  useChangeOrderStatus,
  useClient,
  useClientOrders,
  useDeleteClient,
  useStatusList,
  useUpdateClient,
} from '../hooks/query';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateClientPayload } from '@lance/shared/models/api/clients';

export const ClientPage = () => {
  const { id: queryID } = useParams();
  const navigate = useNavigate();
  const [ordersPage, setOrdersPage] = useState(1);

  const { data: client } = useClient({ id: queryID as string });
  const { data: orders } = useClientOrders({
    id: queryID as string,
    page: ordersPage.toString(),
    perPage: '5',
  });
  const { mutateAsync: updateClient } = useUpdateClient();
  const { mutateAsync: deleteClient } = useDeleteClient();
  const { data: statuses } = useStatusList();
  const { mutateAsync: changeStatus } = useChangeOrderStatus();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<UpdateClientPayload['data']>();

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleOpenDeletePopup = () => setDeletePopupOpen(true);
  const handleCloseDeletePopup = () => setDeletePopupOpen(false);

  if (!client) return <p>No data</p>;

  const hasOrders = orders && orders.data.length > 0;
  const id = client.data._id.toString();

  const handleDeleteClient = async () => {
    const result = await deleteClient({ id });

    if (result.data === 'success') {
      navigate('/clients/1');
    }
  };

  const handleUpdateClient: SubmitHandler<UpdateClientPayload['data']> = (
    data
  ) => {
    const { name, description } = data;

    updateClient({
      id: client.data._id.toString(),
      data: { name, description },
    }).then(() => {
      reset(watch(), { keepValues: false, keepDirty: false });
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      onSubmit={handleSubmit(handleUpdateClient)}
      alignItems="flex-start"
      gap={3}
    >
      <Typography variant="caption">ID: {id}</Typography>
      <TextField
        variant="standard"
        component="h2"
        label="Name"
        fullWidth
        defaultValue={client.data.name}
        {...register('name')}
      />
      <TextField
        label="Description"
        multiline
        minRows={6}
        maxRows={6}
        fullWidth
        defaultValue={client.data.description}
        {...register('description')}
      />
      {isDirty && <Button type="submit">Save</Button>}
      <Typography>Orders</Typography>
      {hasOrders ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Is Completed</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders?.data.map((order) => (
                  <TableRow
                    key={`row-order-${order._id}`}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell width={1}>{order._id.toString()}</TableCell>
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
                    <TableCell align="left">
                      <Checkbox disabled checked={order.is_completed} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            page={orders.pagination.page}
            count={orders.pagination.totalPages}
            onChange={(_, page) => {
              setOrdersPage(page);
            }}
          />
        </>
      ) : (
        <Typography>No orders</Typography>
      )}
      <Button
        type="button"
        color="error"
        onClick={handleOpenDeletePopup}
        fullWidth={false}
      >
        Delete client
      </Button>

      <Dialog open={deletePopupOpen} onClose={handleCloseDeletePopup}>
        <DialogTitle id="modal-modal-title" variant="h6" component="h2">
          Are you sure to delete client "{client.data.name}" ({id.slice(0, 4)}
          ...{id.slice(id.length - 4, id.length)})?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this client will also delete all of their orders. Make sure
            to reassign them to different clients if you want to prevent this
            from happening.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletePopup}>Cancel</Button>
          <Button color="error" onClick={handleDeleteClient}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
