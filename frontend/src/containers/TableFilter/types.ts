export enum TableFilterFieldType {
  Select = 'SELECT',
  Number = 'NUMBER',
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
  onChange: (value: string | null) => void;
};

export type TableNumberFilterProps = TableFilterBase & {
  type: TableFilterFieldType.Number;
  min?: number;
  max?: number;
  onChange: (value: number | null) => void;
};

export type SingleTableFilterProps =
  | TableSelectFilterProps
  | TableNumberFilterProps;
