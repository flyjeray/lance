import { TextField } from '@mui/material';
import { TableNumberFilterProps } from '../types';
import useDebounce from '../../../hooks/useDebounce';
import { ChangeEvent, useEffect, useState } from 'react';

export const TableNumberFilter = (props: TableNumberFilterProps) => {
  const [value, setValue] = useState<number | null>(null);
  const debounced = useDebounce(value, 500);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event.target.value) {
      setValue(null);
    } else {
      const asNumber = Number(event.target.value);

      if (
        (props.min === undefined || asNumber >= props.min) &&
        (props.max === undefined || asNumber <= props.max)
      ) {
        setValue(asNumber);
      }
    }
  };

  useEffect(() => {
    props.onChange(debounced);
  }, [debounced]);

  return (
    <TextField
      type="number"
      defaultValue={null}
      onChange={onChange}
      label={props.label}
    />
  );
};
