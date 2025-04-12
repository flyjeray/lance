import { Box, Button, TextField } from '@mui/material';
import { useCreateOrder } from '../../hooks/query';

export const OrderCreateForm = () => {
  const { mutateAsync: createOrder } = useCreateOrder();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const client = formData.get('client') as string;
    const price = formData.get('price') as string;

    const priceAsNumber = Number(price);

    createOrder({
      title,
      client,
      price: priceAsNumber,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
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
        <Button type="submit">Create order</Button>
      </Box>
    </form>
  );
};
