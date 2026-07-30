import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Shield } from 'lucide-react';
import RecentActivity from '../../../../components/Admin/dashboard/RecentActivity';
import StatsCards from '../../../../components/Admin/dashboard/StatsCards';
import StructureStats from '../../../../components/Admin/dashboard/StructureStats';
import UploadTrendChart from '../../../../components/Admin/dashboard/UploadTrendChart';
import UserStats from '../../../../components/Admin/dashboard/UserStats';
import { CircularLoader } from '../../../../components/Loader';
import { Separator } from '../../../../components/ui/separator';
import useDashboardApis from '../../../../services/dashboardService';

const AdminDashboard = () => {
  const { fetchAdminDashboardStats } = useDashboardApis();

  const { data, isPending, isError } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: fetchAdminDashboardStats,
    retry: false,
  });

  const isLoading = isPending;
  const hasError = isError;

  console.log('data:', data);

  return (
    <div className="mx-10 my-10">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <Shield size={40} className="text-teal-600" />
          <div>
            <p className="text-2xl font-bold">Admin Dashboard</p>
            <p className="text-sm text-gray-600">
              Tax Law System Overview & Analytics
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* States */}
      {isLoading && (
        <div className="mt-[20%] flex justify-center">
          <CircularLoader />
        </div>
      )}

      {hasError && (
        <div className="mt-[15%] flex flex-col items-center text-center gap-4">
          <AlertTriangle size={48} className="text-red-500" />
          <p className="text-lg font-semibold text-gray-800">
            Unable to fetch dashboard data
          </p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !hasError && data && (
        <div className="space-y-6 mt-6">
          <StatsCards data={data?.data} />
          <UploadTrendChart data={data?.data?.uploadTrends} />
          <StructureStats data={data?.data?.structureStats} />
          <UserStats data={data?.data?.userStats} />
          <RecentActivity data={data?.data?.recentActivity} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
