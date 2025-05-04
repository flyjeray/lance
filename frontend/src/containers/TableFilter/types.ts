export enum TableFilterFieldType {
  Select = 'SELECT',
  Number = 'NUMBER',
  Checkbox = 'CHECKBOX',
}

type TableFilterBase = {
  label: string;
};

export type TableSelectFilterProps = TableFilterBase & {
  type: TableFilterFieldType.Select;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string | undefined) => void;
};

export type TableNumberFilterProps = TableFilterBase & {
  type: TableFilterFieldType.Number;
  min?: number;
  max?: number;
  onChange: (value: number | undefined) => void;
};

export type TableCheckboxFilterProps = TableFilterBase & {
  type: TableFilterFieldType.Checkbox;
  onChange: (value: boolean | undefined) => void;
};

export type SingleTableFilterProps =
  | TableSelectFilterProps
  | TableNumberFilterProps
  | TableCheckboxFilterProps;
