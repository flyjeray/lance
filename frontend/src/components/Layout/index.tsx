import { Link } from 'react-router';
import styles from './styles.module.scss';
import { Button } from '../Button';
import { AuthAPI } from '../../api/routers/auth';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AuthActions } from '../../redux/slices/auth';

type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.authSlice);

  const handleLogout = () => {
    AuthAPI.logout();
    dispatch(AuthActions.logout());
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <p>Welcome, {me?.name}</p>
        <Link to={{ pathname: '/' }}>Home</Link>
        <Link to={{ pathname: '/clients/1' }}>Clients</Link>
        <Link to={{ pathname: '/orders/1' }}>Orders</Link>
        <Button label="Logout" onClick={handleLogout} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
