import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useStatusList } from '../hooks/query';

export const StatusesTablePage = () => {
  const { data: statuses } = useStatusList();

  if (!statuses?.data) return <Typography>No statuses yet</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Title</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {statuses?.data.map((status) => (
            <TableRow
              key={`row-order-${status._id}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell width={1} component="th" scope="row">
                {status._id.toString()}
              </TableCell>
              <TableCell align="left">{status.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
