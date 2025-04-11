import { Button, Input } from '../../components';
import { useCreateClient } from '../../hooks/query';

export const ClientCreateForm = () => {
  const { mutateAsync: createClient } = useCreateClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;

    createClient({ name });
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
