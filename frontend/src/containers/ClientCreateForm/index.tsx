import { Box, Button, TextField } from '@mui/material';
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
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          type="text"
          id="name"
          name="name"
          placeholder="Client name"
          required
        />
        <Button type="submit">Create client</Button>
      </Box>
    </form>
  );
};
