"use client";

import { useMerchantDetail } from "@/features/merchants/hooks";
import { usePayments } from "@/features/payments/hooks";
import { use } from "react";
import DetailItem from "@/features/merchants/components/DetailItem";
import StatusBadge from "@/features/merchants/components/StatusBadge";

export default function MerchantDetailPage({
  params,
}: {
  params: Promise<{ mchtCode: string }>;
}) {
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

  // 해당 가맹점 거래 필터링
  const merchantPayments = payments?.filter(
    (p) => p.mchtCode === merchant.mchtCode
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        {merchant.mchtName}
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-10">

        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <DetailItem label="가맹점 코드" value={merchant.mchtCode} />
          <DetailItem label="가맹점명" value={merchant.mchtName} />
          <DetailItem label="업종" value={merchant.bizType} />
          <DetailItem label="상태" value={<StatusBadge status={merchant.status} />} />
          <DetailItem label="사업자번호" value={merchant.bizNo} />
          <DetailItem label="주소" value={merchant.address} />
          <DetailItem label="연락처" value={merchant.phone} />
          <DetailItem label="이메일" value={merchant.email} />
          <DetailItem
            label="등록일"
            value={new Date(merchant.registeredAt).toLocaleString("ko-KR")}
          />
          <DetailItem
            label="수정일"
            value={new Date(merchant.updatedAt).toLocaleString("ko-KR")}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">🧾 거래내역</h2>

      {merchantPayments?.length === 0 ? (
        <div className="text-gray-500">해당 가맹점의 거래내역이 없습니다.</div>
      ) : (
        <div className="table-container">
          <table className="table-root">
            <thead>
              <tr className="table-head-row">
                <th className="table-head-cell">결제코드</th>
                <th className="table-head-cell">금액</th>
                <th className="table-head-cell">결제수단</th>
                <th className="table-head-cell">상태</th>
                <th className="table-head-cell">결제일시</th>
              </tr>
            </thead>

            <tbody>
              {merchantPayments?.map((p) => (
                <tr key={p.paymentCode} className="table-row">
                  <td className="table-body-cell">{p.paymentCode}</td>
                  <td className="table-body-cell">
                    {Number(p.amount).toLocaleString()}원
                  </td>
                  <td className="table-body-cell">{p.payType}</td>

                  <td className="table-body-cell">
                    <StatusBadge status={p.status} />
                  </td>

                  <td className="table-body-cell">
                    {new Date(p.paymentAt).toLocaleString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}