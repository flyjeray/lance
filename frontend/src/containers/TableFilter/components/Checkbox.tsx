import { Checkbox, FormControlLabel } from '@mui/material';
import { TableCheckboxFilterProps } from '../types';
import { ChangeEvent } from 'react';

export const TableCheckboxFilter = (props: TableCheckboxFilterProps) => {
  const handleOnChange = (_: ChangeEvent, checked: boolean) => {
    props.onChange(checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox onChange={handleOnChange} />}
      label={props.label}
    />
  );
};
