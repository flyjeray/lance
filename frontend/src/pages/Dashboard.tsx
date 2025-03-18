import { useNavigate } from 'react-router';
import { Button } from '../components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AuthActions } from '../redux/slices/auth';
import {
  ClientCreateForm,
  ClientsTopList,
  OrderCreateForm,
  OrdersTopList,
} from '../containers';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { me } = useAppSelector((state) => state.authSlice);

  const handleLogout = () => {
    dispatch(AuthActions.logout());
    navigate('/');
  };

  return (
    <div>
      <p>{me?.name}</p>
      <OrdersTopList />
      <ClientsTopList />
      <OrderCreateForm />
      <ClientCreateForm />
      <Button onClick={handleLogout} label="Logout" />
    </div>
  );
};
