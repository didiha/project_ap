export function groupPaymentsByDate(payments: any[], days = 7) {
  const map: Record<string, number> = {};

  payments.forEach((p) => {
    const date = new Date(p.paymentAt).toISOString().slice(0, 10);
    map[date] = (map[date] || 0) + 1;
  });

  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);

    result.push({
        date: key,
        value: map[key] || 0,
    });
  }

  return result;
}

export function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

export function filterTodayPayments(payments: any[]) {
  const today = getTodayString();
  return payments.filter(p => p.paymentAt.startsWith(today));
}

export function calculateKPI(payments: any[], merchants: any[]) {
  const todayPayments = filterTodayPayments(payments);

  const todayCount = todayPayments.length;
  const todayAmount = todayPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  const successCount = payments.filter(p => p.status === "SUCCESS").length;
  const failCount = payments.filter(p => p.status === "FAILED").length;
  const cancleCount = payments.filter(p => p.status === "CANCELLED").length;

  const successRate = payments.length
    ? ((successCount / payments.length) * 100).toFixed(1)
    : "0";

  const failRate = payments.length
    ? ((failCount / payments.length) * 100).toFixed(1)
    : "0";

  const cancleRate = payments.length
    ? ((cancleCount / payments.length) * 100).toFixed(1)
    : "0";

  return {
    todayCount,
    todayAmount,
    successRate,
    failRate,
    cancleRate,
    merchantCount: merchants.length,
  };
}
