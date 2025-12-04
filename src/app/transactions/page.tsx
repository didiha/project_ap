"use client";

import { usePayments } from "@/features/payments/hooks";

export default function TransactionsPage() {
  const { data, isLoading, isError } = usePayments();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류 발생</div>;
  if (!data || data.length === 0) return <div>거래 내역이 없습니다.</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">거래 내역</h1>

      <table className="w-full border-collapse text-sm">
          <thead>
          <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">결제코드</th>
              <th className="p-2 text-left">가맹점코드</th>
              <th className="p-2 text-left">금액</th>
              <th className="p-2 text-left">결제수단</th>
              <th className="p-2 text-left">상태</th>
              <th className="p-2 text-left">승인일시</th>
          </tr>
          </thead>

          <tbody>
          {data.map((p) => (
              <tr key={p.paymentCode} className="border-b">
              <td className="p-2">{p.paymentCode}</td>
              <td className="p-2">{p.mchtCode}</td>
              <td className="p-2">{Number(p.amount).toLocaleString()}원</td>
              <td className="p-2">{p.payType}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">
                  {new Date(p.paymentAt).toLocaleString("ko-KR")}
              </td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  )
}