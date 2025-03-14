import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AuthActions } from '../redux/slices/auth';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, me } = useAppSelector((state) => state.authSlice);

  const handleLogout = () => {
    dispatch(AuthActions.logout());
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{me?.name}</p>
      <p>{token}</p>
      <Button onClick={handleLogout} label="Logout" />
    </div>
  );
};
