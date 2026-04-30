import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface BackButtonProps {
  fallbackRoute?: string; // optional: go here if there's no history
  label?: string; // optional: customize button text
}
const BackButton = ({
  fallbackRoute = '/',
  label = 'Back',
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // go back
    } else {
      navigate(fallbackRoute); // fallback route if no history
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="flex items-center gap-2 cursor-pointer text-teal"
    >
      <ArrowLeft className="h-4 w-4 text-teal" />
      {label}
    </Button>
  );
};

export default BackButton;
