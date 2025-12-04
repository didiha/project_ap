"use client";

export default function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();

  if (normalized === "SUCCESS" || normalized === "ACTIVE")
    return <span className="status-badge status-success">{normalized}</span>;

  if (normalized === "FAILED" || normalized === "INACTIVE")
    return <span className="status-badge status-failed">{normalized}</span>;

  return <span className="status-badge status-cancelled">{normalized}</span>;
}
