import { Link } from 'react-router';
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link to={{ pathname: '/' }}>Home</Link>
        <Link to={{ pathname: '/clients/1' }}>Clients</Link>
        <Link to={{ pathname: '/orders/1' }}>Orders</Link>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
