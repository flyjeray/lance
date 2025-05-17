import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  useClientNameDictionary,
  useCreateOrder,
  useStatusList,
} from '../../hooks/query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateOrderPayload } from '@lance/shared/models/api/orders';

export const OrderCreateForm = () => {
  const { mutateAsync: createOrder } = useCreateOrder();
  const { data: statuses } = useStatusList();
  const { data: clients } = useClientNameDictionary();

  const { register, handleSubmit } = useForm<CreateOrderPayload>();

  const handleCreateOrder: SubmitHandler<CreateOrderPayload> = (data) => {
    const { title, client, price, status } = data;

    const priceAsNumber = Number(price);

    createOrder({
      title,
      client,
      price: priceAsNumber,
      status,
    });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(handleCreateOrder)}
      spacing={3}
      width="100%"
    >
      <TextField
        type="text"
        id="title"
        placeholder="Order title"
        required
        {...register('title')}
      />
      <FormControl>
        <InputLabel>Client</InputLabel>
        <Select
          id="client"
          label="Client"
          style={{ width: 300 }}
          {...register('client')}
        >
          {Object.entries(clients?.data || {}).map(([id, name]) => (
            <MenuItem value={id.toString()}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        id="price"
        placeholder="Price"
        required
        {...register('price')}
      />
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          id="status"
          label="Status"
          style={{ minWidth: 300 }}
          {...register('status')}
        >
          {statuses?.data.map((status) => (
            <MenuItem value={status._id.toString()}>{status.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit">Create order</Button>
    </Grid>
  );
};
