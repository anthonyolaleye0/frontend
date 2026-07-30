import type { RecentActivityType } from '../../../constants/types';

const RecentActivity = ({ data }: { data: RecentActivityType[] }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold mb-4">Recent Uploads</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: RecentActivityType) => (
            <tr key={item._id} className="border-t">
              <td>{item.title}</td>
              <td>{item.status}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
