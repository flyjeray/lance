import { Autocomplete, TextField } from '@mui/material';
import { TableSelectFilterProps } from '../types';
import { SyntheticEvent } from 'react';

export const TableSelectFilter = (props: TableSelectFilterProps) => {
  const onChange = (
    _: SyntheticEvent<Element, Event>,
    selected: { label: string; value: string } | null
  ) => {
    props.onChange(selected?.value || null);
  };

  return (
    <Autocomplete
      disablePortal
      options={props.options}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      onChange={onChange}
      style={{ minWidth: 300 }}
    />
  );
};
