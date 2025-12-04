export interface Payment {
  amount(amount: any): unknown;
  paymentCode: string;
  mchtCode: string;
  amout: string;
  curryency: string;
  payType: "ONLINE" | "OFFLINE" | string;
  status: "PEDING" | "SUCCESS" | "FAIL" | string;
  paymentAt: string;
}

export interface PaymentListResponse {
    status: number;
    message: string;
    data: Payment[];
}