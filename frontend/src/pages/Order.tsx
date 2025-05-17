import { Link, useNavigate, useParams } from 'react-router';
import {
  useChangeOrderClient,
  useChangeOrderStatus,
  useClientNameDictionary,
  useDeleteOrder,
  useOrder,
  useStatusList,
  useSwitchOrderCompletionStatus,
  useUpdateOrder,
} from '../hooks/query';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateOrderPayload } from '@lance/shared/models/api/orders';

export const OrderPage = () => {
  const navigate = useNavigate();
  const { id: paramsID } = useParams();
  const { data: clients } = useClientNameDictionary();
  const { data: order } = useOrder({ id: paramsID as string });
  const { data: statuses } = useStatusList();
  const { mutateAsync: changeClient } = useChangeOrderClient();
  const { mutateAsync: changeStatus } = useChangeOrderStatus();
  const { mutateAsync: updateOrder } = useUpdateOrder();
  const { mutateAsync: deleteOrder } = useDeleteOrder();
  const { mutateAsync: switchCompleteStatus } =
    useSwitchOrderCompletionStatus();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
    watch,
  } = useForm<UpdateOrderPayload['data']>();

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleOpenDeletePopup = () => setDeletePopupOpen(true);
  const handleCloseDeletePopup = () => setDeletePopupOpen(false);

  if (!order) return <p>No data</p>;

  const id = order.data._id.toString();
  const currentStatusLabel = statuses?.data.find(
    (s) => s._id.toString() === order.data.status_id.toString()
  );

  const handleChangeClient = (event: SelectChangeEvent) => {
    changeClient({
      orderID: order.data._id.toString(),
      newClientID: event.target.value,
    });
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    changeStatus({
      orderID: id,
      newStatusID: event.target.value,
    });
  };

  const handleSwitchCompleted = () => {
    switchCompleteStatus({
      id: order.data._id.toString(),
      value: !order.data.is_completed,
    });
  };

  const handleUpdateOrder: SubmitHandler<UpdateOrderPayload['data']> = (
    data
  ) => {
    const { title, description } = data;

    updateOrder({
      id: order.data._id.toString(),
      data: { title, description },
    }).then(() => {
      reset(watch(), { keepValues: false, keepDirty: false });
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
      onSubmit={handleSubmit(handleUpdateOrder)}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={3}
    >
      <Typography variant="caption">ID: {id}</Typography>

      <TextField
        variant="standard"
        label="Title"
        fullWidth
        defaultValue={order.data.title}
        {...register('title')}
      />
      <TextField
        label="Description"
        multiline
        minRows={6}
        maxRows={6}
        fullWidth
        defaultValue={order.data.description}
        {...register('description')}
      />
      {isDirty && <Button type="submit">Save</Button>}

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={order.data.is_completed}
            onChange={handleSwitchCompleted}
          />
        }
        label="Is Completed?"
      />

      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        gap={16}
      >
        <Box display="flex" flex={1} flexDirection="column" gap={3}>
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
        </Box>

        <Box display="flex" flex={1} flexDirection="column" gap={3}>
          <Typography>Current status: {currentStatusLabel?.label}</Typography>

          <FormControl>
            <InputLabel>Change status</InputLabel>
            <Select
              label="Change status"
              defaultValue={order.data.status_id.toString()}
              onChange={handleChangeStatus}
            >
              {statuses?.data.map((status) => (
                <MenuItem value={status._id.toString()}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

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
