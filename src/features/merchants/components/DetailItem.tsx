"use client";

export default function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <>
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </>
  );
}
