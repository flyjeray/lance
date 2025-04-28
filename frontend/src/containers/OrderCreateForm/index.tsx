import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useCreateOrder, useStatusList } from '../../hooks/query';

export const OrderCreateForm = () => {
  const { mutateAsync: createOrder } = useCreateOrder();
  const { data: statuses } = useStatusList();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const client = formData.get('client') as string;
    const price = formData.get('price') as string;
    const status = formData.get('status') as string;

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
      onSubmit={handleSubmit}
      spacing={3}
      width="100%"
    >
      <TextField
        type="text"
        id="title"
        name="title"
        placeholder="Order title"
        required
      />
      <TextField
        type="text"
        id="client"
        name="client"
        placeholder="Client ID"
        required
      />
      <TextField
        type="number"
        id="price"
        name="price"
        placeholder="Price"
        required
      />
      <Select name="status" id="status" label="Status">
        {statuses?.data.map((status) => (
          <MenuItem value={status._id.toString()}>{status.label}</MenuItem>
        ))}
      </Select>
      <Button type="submit">Create order</Button>
    </Grid>
  );
};
