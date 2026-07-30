import type { UserStatsType } from '../../../constants/types';

const UserStats = ({ data }: { data: UserStatsType }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold mb-4">User Statistics</h2>

      <div className="grid grid-cols-3 gap-4">
        <Item label="Total Users" value={data.totalUsers} />
        <Item label="Admins" value={data.totalAdmins} />
        <Item label="Regular Users" value={data.totalRegularUsers} />
      </div>
    </div>
  );
};

const Item = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default UserStats;
