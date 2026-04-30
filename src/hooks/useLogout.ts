// hooks/useLogout.ts
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuthApis from '../services/authService';
import logoutHelper from './logoutHelper';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logoutUser } = useAuthApis();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      console.log('i want to log user out data:', data);

      toast.success(data?.data?.message);
      logoutHelper();
      queryClient.clear();

      navigate('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        logoutHelper();

        queryClient.clear();

        navigate('/login');
      } else {
        console.error('An error occurred');
        logoutHelper();

        queryClient.clear();

        // Navigate to login
        navigate('/login');
      }
    }
  };

  return handleLogout;
};

export default useLogout;
