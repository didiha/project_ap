"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-56 h-screen bg-white p-4 flex flex-col flex justify-between">
      <nav className="flex flex-col gap-5 text-gray-700 mt-10">
        <Link href="/dashboard" className="hover:text-black">📊 Dashboard</Link>
        <Link href="/payments" className="hover:text-black">💳 거래내역</Link>
        <Link href="/merchants" className="hover:text-black">🏬 가맹점 목록</Link>
      </nav>

      <div className="p-4 font-bold text-3xl text-center text-gray-200">올페이즈</div>
    </aside>
  );
}
