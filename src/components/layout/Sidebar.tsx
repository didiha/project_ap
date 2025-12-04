"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen bg-white border-r p-4 flex flex-col">
      <nav className="flex flex-col gap-3 text-gray-700">
        <Link href="/dashboard" className="hover:text-black">📊 Dashboard</Link>
        <Link href="/transactions" className="hover:text-black">💳 거래내역</Link>
        <Link href="/merchants" className="hover:text-black">🏬 가맹점 목록</Link>
      </nav>
    </aside>
  );
}
