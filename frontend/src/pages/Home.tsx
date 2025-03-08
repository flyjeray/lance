import { useNavigate } from 'react-router';
import { Button } from '../components/Button';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/test');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={handleNavigate} />
    </div>
  );
};
