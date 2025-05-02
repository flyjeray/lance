import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDeleteStatus, useStatusList } from '../hooks/query';
import { StatusCreateForm } from '../containers';
import { useMemo, useState } from 'react';
import { DeleteStatusPayload } from '@lance/shared/models/api/statuses';
import { Status } from '@lance/shared/models/status';

type DeleteUIParams = {
  labelToDelete: string;
  arrayWithoutToDelete: Status[];
};

export const StatusesTablePage = () => {
  const { data: statuses } = useStatusList();
  const { mutateAsync: deleteStatus } = useDeleteStatus();

  const [deleteParams, setDeleteParams] = useState<
    Partial<DeleteStatusPayload>
  >({});

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleOpenDeletePopup = () => setDeletePopupOpen(true);
  const handleCloseDeletePopup = () => setDeletePopupOpen(false);

  const handleSelectStatusToDelete = (id: string) => {
    if (!statuses?.data) return;

    const arrayWithoutToDelete = statuses.data.filter(
      (x) => x._id.toString() !== id
    );

    const defaultReplacementId = arrayWithoutToDelete[0]?._id?.toString();

    setDeleteParams({ id, replacement_id: defaultReplacementId });
    handleOpenDeletePopup();
  };

  const handleSelectStatusToReplaceWith = (replacement_id: string) => {
    setDeleteParams((prev) => ({ ...prev, replacement_id }));
  };

  const handleDeleteStatus = () => {
    const { id, replacement_id } = deleteParams;

    if (!(id && replacement_id)) return;

    deleteStatus({ id, replacement_id }).then(() => handleCloseDeletePopup());
  };

  const deleteUIParams: DeleteUIParams = useMemo(() => {
    if (statuses?.data && deleteParams.id) {
      const arrayWithoutToDelete = statuses.data.filter(
        (x) => x._id.toString() !== deleteParams.id
      );

      const labelToDelete =
        statuses.data.find((s) => s._id.toString() === deleteParams.id)
          ?.label || '';

      return {
        labelToDelete,
        arrayWithoutToDelete,
      };
    }

    return {
      labelToDelete: '',
      arrayWithoutToDelete: [],
    };
  }, [statuses?.data, deleteParams.id]);

  if (!statuses?.data) return <Typography>No statuses yet</Typography>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h5" width="100%" align="left">
        Create new status
      </Typography>
      <StatusCreateForm />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Actions</TableCell>
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
                <TableCell align="left">
                  <Button
                    color="error"
                    disabled={statuses.data.length === 1}
                    onClick={() =>
                      handleSelectStatusToDelete(status._id.toString())
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deletePopupOpen} onClose={handleCloseDeletePopup}>
        <DialogTitle id="modal-modal-title" variant="h6" component="h2">
          Are you sure to delete status "{deleteUIParams.labelToDelete}" (
          {deleteParams.id?.slice(0, 4)}
          ...
          {deleteParams.id?.slice(
            deleteParams.id?.length - 4,
            deleteParams.id?.length
          )}
          )?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Before deleting this status, please choose the status to replace it.
          </DialogContentText>
          <Select
            fullWidth
            value={deleteParams.replacement_id || ''}
            onChange={(event) =>
              handleSelectStatusToReplaceWith(event.target.value)
            }
          >
            {deleteUIParams.arrayWithoutToDelete.map((status) => (
              <MenuItem
                key={status._id.toString()}
                value={status._id.toString()}
              >
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletePopup}>Cancel</Button>
          <Button
            disabled={!(deleteParams.id || deleteParams.replacement_id)}
            color="error"
            onClick={() => handleDeleteStatus()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
