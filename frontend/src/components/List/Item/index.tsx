import { useNavigate } from 'react-router';
import styles from './styles.module.scss';

export type ListItemEntry = {
  title: string;
  link?: string;
};

export const ListItem = ({ title, link }: ListItemEntry) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <button disabled={!link} onClick={handleClick} className={styles.entry}>
      <p className={styles.title}>{title}</p>
    </button>
  );
};
