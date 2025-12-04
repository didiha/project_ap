import api from "@/utils/api";
import type { Payment, PaymentListResponse } from "./types";

export async function fetchPayments() {
    const res = await api.get<PaymentListResponse>("/payments/list");
    return res.data.data;
}