import { Button, Grid, TextField } from '@mui/material';
import { useCreateClient } from '../../hooks/query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateClientPayload } from '@lance/shared/models/api/clients';

export const ClientCreateForm = () => {
  const { mutateAsync: createClient } = useCreateClient();

  const { register, handleSubmit } = useForm<CreateClientPayload>();

  const handleCreateClient: SubmitHandler<CreateClientPayload> = (data) => {
    const { name } = data;
    createClient({ name });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(handleCreateClient)}
      spacing={3}
      width="100%"
    >
      <TextField
        type="text"
        id="name"
        placeholder="Client name"
        required
        {...register('name')}
      />
      <Button type="submit">Create client</Button>
    </Grid>
  );
};
