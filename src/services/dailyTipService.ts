import { getDailyTipByIdRoute, getUserInboxRoute } from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useDailyTipApis = () => {
  const getUserInbox = async (
    userId: string,
    page?: string,
    limit?: string,
    searchValue?: string,
  ) => {
    console.log('I am being triggered...');
    const params: Record<string, string> = {};

    if (searchValue) params.searchParams = searchValue;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    const response = await axiosInstance.get(`${getUserInboxRoute}/${userId}`, {
      params,
    });

    return response.data;
  };

  const getDailyTipById = async (tipId: string) => {
    const response = await axiosInstance.get(
      `${getDailyTipByIdRoute}/${tipId}`,
    );

    return response.data;
  };

  return {
    getUserInbox,
    getDailyTipById,
  };
};

export default useDailyTipApis;
