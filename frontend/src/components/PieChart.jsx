import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function PieChart({ data = [] }) {
  const chartData =
    data && data.length > 0
      ? data.map((item, index) => ({
          name: item.label || item._id || item.name || `Category ${index + 1}`,
          value: item.value || item.total || item.amount || 0,
          color: item.color || COLORS[index % COLORS.length],
        }))
      : [
          { name: "Food", value: 6500, color: COLORS[0] },
          { name: "Travel", value: 3200, color: COLORS[1] },
          { name: "Bills", value: 4000, color: COLORS[2] },
          { name: "Shopping", value: 4800, color: COLORS[3] },
          { name: "Entertainment", value: 1800, color: COLORS[4] },
        ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "20px",
        height: "500px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
      }}
    >
      <ResponsiveContainer width="100%" height="90%">
        <RePieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />

          <Legend verticalAlign="bottom" height={36} />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;