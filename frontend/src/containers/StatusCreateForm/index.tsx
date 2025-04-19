import { Box, Button, TextField } from '@mui/material';
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
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          type="text"
          id="label"
          name="label"
          placeholder="Status label"
          required
        />
        <Button type="submit">Create status</Button>
      </Box>
    </form>
  );
};
