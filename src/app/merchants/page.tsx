"use client";

import { useMerchants } from "@/features/merchants/hooks";
import { useRouter } from "next/navigation";

export default function MerchantsPage() {
  const { data, isLoading, isError } = useMerchants();
  const router = useRouter();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터 로드 오류</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">가맹점 목록</h1>

      <div className="table-container max-w-4xl mx-auto">
        <table className="table-root">
          <thead>
            <tr className="table-head-row">
              <th className="table-head-cell text-center">가맹점코드</th>
              <th className="table-head-cell text-center">가맹점명</th>
              <th className="table-head-cell text-center">상태</th>
              <th className="table-head-cell text-center">업종</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((m) => (
              <tr
                key={m.mchtCode}
                className="table-row cursor-pointer"
                onClick={() => router.push(`/merchants/${m.mchtCode}`)}
              >
                <td className="table-body-cell">{m.mchtCode}</td>
                <td className="table-body-cell">{m.mchtName}</td>

                <td className="table-body-cell">
                  {m.status === "ACTIVE" && (
                    <span className="status-badge status-success">ACTIVE</span>
                  )}
                  {m.status === "INACTIVE" && (
                    <span className="status-badge status-failed">INACTIVE</span>
                  )}
                  {m.status !== "ACTIVE" && m.status !== "INACTIVE" && (
                    <span className="status-badge status-cancelled">{m.status}</span>
                  )}
                </td>

                <td className="table-body-cell">{m.bizType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
