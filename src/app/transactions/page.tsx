"use client";

import { usePayments } from "@/features/payments/hooks";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

export default function TransactionsPage() {
  const { data, isLoading, isError } = usePayments();
  const [page, setPage] = useState(1);

  const pageSize = 10;

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류 발생</div>;
  if (!data || data.length === 0) return <div>거래 내역이 없습니다.</div>;

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentItems = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">거래 내역</h1>

      <div className="table-container max-w-5xl mx-auto">
        <table className="table-root w-full border-collapse">
          <thead>
          <tr className="table-head-row">
              <th className="table-head-cell">결제코드</th>
              <th className="table-head-cell">가맹점코드</th>
              <th className="table-head-cell">금액</th>
              <th className="table-head-cell">결제수단</th>
              <th className="table-head-cell">상태</th>
              <th className="table-head-cell">승인일시</th>
          </tr>
          </thead>

          <tbody>
            {currentItems.map((p: any) => (
              <tr key={p.paymentCode} className="table-row">
                <td className="table-body-cell">{p.paymentCode}</td>
                <td className="table-body-cell">{p.mchtCode}</td>
                <td className="table-body-cell">
                  {Number(p.amount).toLocaleString()}원
                </td>
                <td className="table-body-cell">{p.payType}</td>

                <td className="table-body-cell">
                  {p.status === "SUCCESS" && (
                    <span className="status-badge status-success">SUCCESS</span>
                  )}
                  {p.status === "FAILED" && (
                    <span className="status-badge status-failed">FAILED</span>
                  )}
                  {p.status === "CANCELLED" && (
                    <span className="status-badge status-cancelled">
                      CANCELLED
                    </span>
                  )}
                </td>

                <td className="table-body-cell">
                  {new Date(p.paymentAt).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
