import { ClientsAPI } from '../../api/routers/clients';
import { Button, Input } from '../../components';

export const ClientCreateForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;

    ClientsAPI.create({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Client name"
        required
      />
      <Button label="Create client" type="submit" />
    </form>
  );
};
