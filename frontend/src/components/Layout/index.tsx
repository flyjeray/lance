import { Link } from 'react-router';
import styles from './styles.module.scss';
import { Button } from '../Button';
import { useLogout, useMe } from '../../hooks/query';

type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { data: me } = useMe();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <p>Welcome, {me?.data.name}</p>
        <Link to={{ pathname: '/' }}>Home</Link>
        <Link to={{ pathname: '/clients/1' }}>Clients</Link>
        <Link to={{ pathname: '/orders/1' }}>Orders</Link>
        <Button label="Logout" onClick={handleLogout} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
