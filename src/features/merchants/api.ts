import api from "@/utils/api";
import { MerchantListResponse, MerchantDetailResponse } from "./types";

export async function fetchMerchants() {
    const res = await api.get<MerchantListResponse>(`/merchants/list`);
    return res.data.data;
}

export async function fetchMerchantsDeatil(mchtCode: string) {
    const res = await api.get<MerchantDetailResponse>(`/merchants/details/${mchtCode}`);
    return res.data.data;
}