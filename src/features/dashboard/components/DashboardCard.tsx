import { Icon } from "@iconify/react";

export default function DashboardCard({
  title,
  value,
  icon,
  color = "blue",
}: {
  title: string;
  value: string | number;
  icon?: string;
  color?: "blue" | "red" | "green" | "yellow";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div className="bg-white shadow-sm border rounded-xl p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-500 text-sm">{title}</div>
          <div className="text-xl font-semibold mt-1">{value}</div>
        </div>

        {icon && (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}
          >
            <Icon icon={icon} width={22} height={22} />
          </div>
        )}
      </div>
    </div>
  );
}
