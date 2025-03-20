import styles from './styles.module.scss';

type ColumnData<T> = {
  label: string;
  render: (data: T) => React.ReactNode;
};

export type Columns<T> = Partial<Record<keyof T, ColumnData<T>>>;

type Props<T> = {
  data: T[];
  columns: Columns<T>;
};

export const Table = <T,>({ data, columns }: Props<T>) => {
  return (
    <div className={styles.table_wrapper}>
      <table>
        <thead>
          <tr>
            {Object.values(columns).map((col, index) => {
              const column = col as ColumnData<T> | undefined;
              return <th key={index}>{column?.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(columns).map(([key, col]) => {
                const column = col as ColumnData<T> | undefined;
                return column ? <td key={key}>{column.render(item)}</td> : null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
