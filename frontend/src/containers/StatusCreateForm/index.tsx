import { Button, Grid, TextField } from '@mui/material';
import { useCreateStatus } from '../../hooks/query';
import { CreateStatusPayload } from '@lance/shared/models/api/statuses';
import { SubmitHandler, useForm } from 'react-hook-form';

export const StatusCreateForm = () => {
  const { mutateAsync: createStatus } = useCreateStatus();

  const { register, handleSubmit } = useForm<CreateStatusPayload>();

  const handleCreateStatus: SubmitHandler<CreateStatusPayload> = (data) => {
    const { label } = data;
    createStatus({ label });
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(handleCreateStatus)}
      spacing={3}
      width="100%"
    >
      <TextField
        type="text"
        id="label"
        placeholder="Status label"
        required
        {...register('label')}
      />
      <Button type="submit">Create status</Button>
    </Grid>
  );
};
