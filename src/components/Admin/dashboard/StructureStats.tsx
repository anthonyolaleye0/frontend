import type { StructureStatsType } from '../../../constants/types';

const StructureStats = ({ data }: { data: StructureStatsType }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold mb-4">Structure Breakdown</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Item label="Chapters" value={data.totalChapters} />
        <Item label="Parts" value={data.totalParts} />
        <Item label="Sections" value={data.totalSections} />
        <Item label="Subsections" value={data.totalSubsections} />
        <Item label="Schedules" value={data.totalSchedules} />
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

export default StructureStats;
