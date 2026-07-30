import { fetchAdminDashboardStatsRoute } from '../hooks/ApiRoutes';
import axiosInstance from '../hooks/axiosInstance';

const useDashboardApis = () => {
  const fetchAdminDashboardStats = async () => {
    const res = await axiosInstance.get(fetchAdminDashboardStatsRoute);
    return res.data;
  };

  return { fetchAdminDashboardStats };
};

export default useDashboardApis;
