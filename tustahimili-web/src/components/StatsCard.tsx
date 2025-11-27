import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
      <div className="text-gray-600 text-3xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
