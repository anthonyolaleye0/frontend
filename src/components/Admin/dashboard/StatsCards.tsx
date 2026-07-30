import type {
  RecentActivityType,
  StructureStatsType,
  TaxLawStatsType,
  UploadStatsType,
  UploadTrendsType,
  UserStatsType,
} from '../../../constants/types';

const StatsCards = ({
  data,
}: {
  data: {
    taxLawStats: TaxLawStatsType;
    userStats: UserStatsType;
    structureStats: StructureStatsType;
    uploadStats: UploadStatsType;
    recentActivity: RecentActivityType[];
    uploadTrends: UploadTrendsType[];
  };
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Tax Laws" value={data.taxLawStats.totalTaxLaws} />
      <Card title="Total Users" value={data.userStats.totalUsers} />
      <Card title="Admins" value={data.userStats.totalAdmins} />
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default StatsCards;
