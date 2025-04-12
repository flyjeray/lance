import { Link, useParams } from 'react-router';
import {
  useChangeOrderClient,
  useClientNameDictionary,
  useOrder,
} from '../hooks/query';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

export const OrderPage = () => {
  const { id } = useParams();
  const { data: clients } = useClientNameDictionary();
  const { data: order } = useOrder({ id: id as string });
  const { mutateAsync: changeClient } = useChangeOrderClient(id as string);

  if (!order) return <p>No data</p>;

  const handleChangeClient = (event: SelectChangeEvent) => {
    changeClient({
      orderID: order.data._id.toString(),
      newClientID: event.target.value,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h2">{order.data.title}</Typography>
      <Typography variant="h4">Client</Typography>
      <Typography>
        Current client:{' '}
        <Link to={{ pathname: `/client/${order.data.client_id}` }}>
          {clients?.data[order.data.client_id.toString()]}
        </Link>
      </Typography>
      <FormControl>
        <InputLabel>Change client</InputLabel>
        <Select
          label="Change client"
          defaultValue={order.data.client_id.toString()}
          onChange={handleChangeClient}
        >
          {Object.entries(clients?.data || {}).map(([id, name]) => (
            <MenuItem value={id}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
