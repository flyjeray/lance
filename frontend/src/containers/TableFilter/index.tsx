import { Grid } from '@mui/material';
import { SingleTableFilterProps } from './types';
import { SingleTableFilter } from './components';

type Props = {
  filters: SingleTableFilterProps[];
};

export const TableFilter = ({ filters }: Props) => {
  return (
    <Grid container spacing={3} width="100%">
      {filters.map((filter) => (
        <SingleTableFilter {...filter} />
      ))}
    </Grid>
  );
};
