"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusPieChart({
  success,
  failed,
  cancelled,
  className
}: {
  success: number;
  failed: number;
  cancelled: number;
  className?: string;
}) {
  const statusStats = [
    { name: "성공", value: success },
    { name: "실패", value: failed },
    { name: "취소", value: cancelled },
  ];

  const COLORS = ["#4F46E5", "#EF4444", "#F59E0B"];

  return (
    <div className={`mt-10 bg-white p-6 shadow rounded-lg ${className}`}>
      <h2 className="text-lg font-semibold mb-4">🥧 결제 상태 비율</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusStats}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusStats.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}