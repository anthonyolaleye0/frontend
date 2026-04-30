import { getAllUsersRoute, getAUserRoute } from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useUserApis = () => {
  const fetchAUser = async (userId: string) => {
    const response = await axiosInstance.get(`${getAUserRoute}/${userId}`);

    return response.data || null;
  };

  const fetchAllUsers = async (
    page?: string,
    limit?: string,
    searchValue?: string,
  ) => {
    console.log('I am being called...Today');
    const params: Record<string, string> = {};

    if (searchValue) params.searchParams = searchValue;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axiosInstance.get(`${getAllUsersRoute}`, {
      params,
    });

    console.log('axios response:', response);
    return response.data;
  };

  return {
    fetchAUser,
    fetchAllUsers,
  };
};

export default useUserApis;
