import { Link, useNavigate, useParams } from 'react-router';
import { useClientList } from '../hooks/query';
import {
  Box,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
