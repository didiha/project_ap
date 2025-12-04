"use client";

import { useMerchantDetail } from "@/features/merchants/hooks";
import { usePayments } from "@/features/payments/hooks";
import { use } from "react";

export default function MerchantDetailPage({ params }: { params: Promise<{ mchtCode: string }> }) {
  const { mchtCode } = use(params);

  const {
    data: merchant,
    isLoading: isLoadingMerchant,
    isError: isErrorMerchant,
  } = useMerchantDetail(mchtCode);

  const {
    data: payments,
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
  } = usePayments();

  if (isLoadingMerchant || isLoadingPayments) return <div>로딩 중...</div>;
  if (isErrorMerchant || isErrorPayments) return <div>데이터 로드 오류</div>;
  if (!merchant) return <div>가맹점 데이터를 찾을 수 없습니다.</div>;

  // 현재 가맹점의 거래내역 필터링
  const merchantPayments = payments?.filter((p) => p.mchtCode === mchtCode);

  return (
    <div>
      {/* 가맹점 상세 */}
      <h1 className="text-2xl font-semibold mb-4">가맹점 상세 — {merchant.mchtName}</h1>

      <div className="bg-white shadow rounded p-4 max-w-xl mb-10">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <span className="text-gray-500">가맹점 코드</span>
          <span>{merchant.mchtCode}</span>

          <span className="text-gray-500">가맹점명</span>
          <span>{merchant.mchtName}</span>

          <span className="text-gray-500">업종</span>
          <span>{merchant.bizType}</span>

          <span className="text-gray-500">상태</span>
          <span>{merchant.status}</span>

          <span className="text-gray-500">사업자번호</span>
          <span>{merchant.bizNo}</span>

          <span className="text-gray-500">주소</span>
          <span>{merchant.address}</span>

          <span className="text-gray-500">연락처</span>
          <span>{merchant.phone}</span>

          <span className="text-gray-500">이메일</span>
          <span>{merchant.email}</span>

          <span className="text-gray-500">등록일</span>
          <span>{new Date(merchant.registeredAt).toLocaleString()}</span>

          <span className="text-gray-500">수정일</span>
          <span>{new Date(merchant.updatedAt).toLocaleString()}</span>
        </div>
      </div>

      {/* 해당 가맹점의 거래 내역 */}
      <h2 className="text-xl font-semibold mb-3">🧾 거래내역</h2>

      {merchantPayments?.length === 0 ? (
        <div className="text-gray-500">해당 가맹점의 거래내역이 없습니다.</div>
      ) : (
        <table className="w-full border-collapse text-sm bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">결제코드</th>
              <th className="p-2 text-left">금액</th>
              <th className="p-2 text-left">수단</th>
              <th className="p-2 text-left">상태</th>
              <th className="p-2 text-left">결제일시</th>
            </tr>
          </thead>

          <tbody>
            {merchantPayments?.map((p) => (
              <tr key={p.paymentCode} className="border-b">
                <td className="p-2">{p.paymentCode}</td>
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
      )}
    </div>
  );
}
