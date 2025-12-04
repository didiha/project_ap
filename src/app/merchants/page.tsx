"use client";

import { useMerchants } from "@/features/merchants/hooks";
import { useRouter } from "next/navigation";

export default function MerchantsPage() {
  const { data, isLoading, isError } = useMerchants();
  const router = useRouter();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터 로드 오류</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">가맹점 목록</h1>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">가맹점코드</th>
            <th className="p-2 text-left">가맹점명</th>
            <th className="p-2 text-left">상태</th>
            <th className="p-2 text-left">업종</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((m) => (
             <tr
              key={m.mchtCode}
              className="border-b cursor-pointer hover:bg-gray-50 transition"
              onClick={() => router.push(`/merchants/${m.mchtCode}`)}
            >
              <td className="p-2">{m.mchtCode}</td>
              <td className="p-2">{m.mchtName}</td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">{m.bizType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
