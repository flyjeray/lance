import { Button, Grid, TextField } from '@mui/material';
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
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      spacing={3}
      width="100%"
    >
      <TextField
        type="text"
        id="name"
        name="name"
        placeholder="Client name"
        required
      />
      <Button type="submit">Create client</Button>
    </Grid>
  );
};
