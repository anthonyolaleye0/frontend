import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  title: string;
  data: { title: string; count: number }[];
  dataKey: string;
};

const TaxLawBarChart = ({ title, data, dataKey }: Props) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="overflow-x-auto">
        <div style={{ width: data.length * 80 }}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} barCategoryGap="20%" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="title"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={80}
              />

              <YAxis />

              <Tooltip />

              <Bar dataKey={dataKey} barSize={30} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaxLawBarChart;
