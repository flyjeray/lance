import { useNavigate } from 'react-router';
import { Button } from '../components/Button';

export const TestPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Test Page</h1>
      <Button onClick={handleNavigate} variant="alternative" />
    </div>
  );
};
