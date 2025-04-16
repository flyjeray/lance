import { SingleTableFilterProps, TableFilterFieldType } from '../types';
import { TableNumberFilter } from './Number';
import { TableSelectFilter } from './Search';

export const SingleTableFilter = (props: SingleTableFilterProps) => {
  switch (props.type) {
    case TableFilterFieldType.Select:
      return <TableSelectFilter {...props} />;
    case TableFilterFieldType.Number:
      return <TableNumberFilter {...props} />;
  }
};
