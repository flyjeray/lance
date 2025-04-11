import { Button, Input } from '../../components';
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
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Order title"
        required
      />
      <Input
        type="text"
        id="client"
        name="client"
        placeholder="Client ID"
        required
      />
      <Input
        type="number"
        id="price"
        name="price"
        placeholder="Price"
        required
      />
      <Button label="Create order" type="submit" />
    </form>
  );
};
