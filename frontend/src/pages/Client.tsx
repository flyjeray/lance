import { Link, useNavigate, useParams } from 'react-router';
import {
  useClient,
  useClientOrders,
  useDeleteClient,
  useUpdateClient,
} from '../hooks/query';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateClientPayload } from '@lance/shared/models/api/clients';

export const ClientPage = () => {
  const { id: queryID } = useParams();
  const navigate = useNavigate();
  const { data: client } = useClient({ id: queryID as string });
  const { data: orders } = useClientOrders({
    id: queryID as string,
    page: '1',
    perPage: '10',
  });
  const { mutateAsync: updateClient } = useUpdateClient();
  const { mutateAsync: deleteClient } = useDeleteClient();

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
        <List component={Paper} style={{ width: '100%' }}>
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
