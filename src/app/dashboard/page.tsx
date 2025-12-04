"use client";

import { usePayments } from "@/features/payments/hooks";
import { useMerchants } from "@/features/merchants/hooks";
import { calculateKPI } from "@/features/dashboard/utils";
import DashboardCard from "@/features/dashboard/components/DashboardCard";
import TransactionsLineChart from "@/features/dashboard/components/TransactionsLineChart";
import StatusPieChart from "@/features/dashboard/components/StatusPieChart";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { groupPaymentsByDate } from "@/features/dashboard/utils";

export default function DashboardPage() {
  const { data: payments, isLoading: isPaymentsLoading } = usePayments();
  const { data: merchants, isLoading: isMerchantsLoading } = useMerchants();

  if (isPaymentsLoading || isMerchantsLoading) return <div>로딩 중...</div>;

  // 안전 처리
  const paymentsList = payments ?? [];
  const merchantsList = merchants ?? [];

  const KPI = calculateKPI(paymentsList, merchantsList);

  const chartData = groupPaymentsByDate(paymentsList, 7);

  const statusStats = [
    { name: "성공", value: paymentsList.filter(p => p.status === "SUCCESS").length },
    { name: "실패", value: paymentsList.filter(p => p.status === "FAIL").length },
    { name: "대기", value: paymentsList.filter(p => p.status === "PENDING").length },
  ];

  const COLORS = ["#4F46E5", "#EF4444", "#F59E0B"];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">대시보드</h1>

      {/* 요약 카드 */}
       <div className="grid grid-cols-6 gap-6">
        <DashboardCard
          title="오늘 거래 건수"
          value={KPI.todayCount}
          icon="mdi:counter"
          color="blue"
        />
        <DashboardCard
          title="오늘 거래 금액"
          value={`${KPI.todayAmount.toLocaleString()}원`}
          icon="mdi:cash"
          color="yellow"
        />
        <DashboardCard
          title="성공률"
          value={`${KPI.successRate}%`}
          icon="mdi:check-circle"
          color="green"
        />
        <DashboardCard
          title="실패율"
          value={`${KPI.failRate}%`}
          icon="mdi:close-circle"
          color="red"
        />
        <DashboardCard
          title="취소율"
          value={`${KPI.cancleRate}%`}
          icon="mdi:undo"
          color="yellow"
        />
        <DashboardCard
          title="활성 가맹점 수"
          value={KPI.merchantCount}
          icon="mdi:store"
          color="blue"
        />
      </div>

      <TransactionsLineChart data={chartData} />
      
      <StatusPieChart
        success={paymentsList.filter(p => p.status === "SUCCESS").length}
        failed={paymentsList.filter(p => p.status === "FAILED").length}
        cancelled={paymentsList.filter(p => p.status === "CANCELLED").length}
        className="mb-10"
      />
    </div>
  );
}