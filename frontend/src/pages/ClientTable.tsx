import { Link, useNavigate, useParams } from 'react-router';
import { useClientList } from '../hooks/query';
import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ClientCreateForm } from '../containers';

export const ClientTablePage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { data: clients } = useClientList({
    page,
    perPage: '5',
  });

  if (!clients) return <p>No data</p>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h5" width="100%" align="left">
        Create new client
      </Typography>
      <ClientCreateForm />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.data.map((client) => (
              <TableRow
                key={`row-client-${client._id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell width={1}>{client._id.toString()}</TableCell>
                <TableCell component="th" scope="row">
                  <Link
                    to={{
                      pathname: `/client/${client._id}`,
                    }}
                  >
                    {client.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{client.description || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {clients.pagination && (
        <Pagination
          page={clients.pagination.page}
          count={clients.pagination.totalPages}
          onChange={(_, page) => {
            navigate(`/clients/${page}`);
          }}
        />
      )}{' '}
    </Box>
  );
};
