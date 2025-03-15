import { ListItem, ListItemEntry } from './Item';
import styles from './styles.module.scss';

type Props = {
  entries: ListItemEntry[];
};

export const List = ({ entries }: Props) => {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <ListItem {...entry} />
      ))}
    </div>
  );
};
