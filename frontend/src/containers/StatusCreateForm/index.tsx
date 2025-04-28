import { Button, Grid, TextField } from '@mui/material';
import { useCreateStatus } from '../../hooks/query';

export const StatusCreateForm = () => {
  const { mutateAsync: createStatus } = useCreateStatus();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const label = formData.get('label') as string;

    createStatus({ label });
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
        id="label"
        name="label"
        placeholder="Status label"
        required
      />
      <Button type="submit">Create status</Button>
    </Grid>
  );
};
