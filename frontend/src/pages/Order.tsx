import { Link, useNavigate, useParams } from 'react-router';
import {
  useChangeOrderClient,
  useClientNameDictionary,
  useDeleteOrder,
  useOrder,
  useUpdateOrder,
} from '../hooks/query';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { id: paramsID } = useParams();
  const { data: clients } = useClientNameDictionary();
  const { data: order } = useOrder({ id: paramsID as string });
  const { mutateAsync: changeClient } = useChangeOrderClient();
  const { mutateAsync: updateOrder } = useUpdateOrder();
  const { mutateAsync: deleteOrder } = useDeleteOrder();
  const [isChanged, setIsChanged] = useState(false);

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleOpenDeletePopup = () => setDeletePopupOpen(true);
  const handleCloseDeletePopup = () => setDeletePopupOpen(false);

  if (!order) return <p>No data</p>;

  const id = order.data._id.toString();

  const handleChangeClient = (event: SelectChangeEvent) => {
    changeClient({
      orderID: order.data._id.toString(),
      newClientID: event.target.value,
    });
  };

  const handleUpdateOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    updateOrder({
      id: order.data._id.toString(),
      data: { title, description },
    }).then(() => {
      setIsChanged(false);
    });
  };

  const handleDeleteOrder = async () => {
    const result = await deleteOrder({ id });

    if (result.data === 'success') {
      navigate('/orders/1');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleUpdateOrder}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={3}
    >
      <Typography variant="caption">ID: {id}</Typography>
      <TextField
        variant="standard"
        label="Title"
        name="title"
        fullWidth
        onChange={() => setIsChanged(true)}
        defaultValue={order.data.title}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        minRows={6}
        maxRows={6}
        fullWidth
        onChange={() => setIsChanged(true)}
        defaultValue={order.data.description}
      />
      {isChanged && <Button type="submit">Save</Button>}
      <Typography>
        Current client:{' '}
        <Link to={{ pathname: `/client/${order.data.client_id}` }}>
          {clients?.data[order.data.client_id.toString()]}
        </Link>
      </Typography>
      <FormControl>
        <InputLabel>Change client</InputLabel>
        <Select
          label="Change client"
          defaultValue={order.data.client_id.toString()}
          onChange={handleChangeClient}
        >
          {Object.entries(clients?.data || {}).map(([id, name]) => (
            <MenuItem value={id}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="button"
        color="error"
        onClick={handleOpenDeletePopup}
        fullWidth={false}
      >
        Delete order
      </Button>

      <Dialog open={deletePopupOpen} onClose={handleCloseDeletePopup}>
        <DialogTitle id="modal-modal-title" variant="h6" component="h2">
          Are you sure to delete order "{order.data.title}" ({id.slice(0, 4)}
          ...{id.slice(id.length - 4, id.length)})?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeletePopup}>Cancel</Button>
          <Button color="error" onClick={handleDeleteOrder}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
