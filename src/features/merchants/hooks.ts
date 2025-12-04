import { useQuery } from "@tanstack/react-query";
import { fetchMerchants, fetchMerchantsDeatil } from "./api";

export function useMerchants() {
    return useQuery({
        queryKey: ["merchants"],
        queryFn: fetchMerchants,
    });
}

export function useMerchantDetail(mchtCode: string) {
    return useQuery({
        queryKey: ["merchantDetail", mchtCode],
        queryFn: () => fetchMerchantsDeatil(mchtCode),
    });
}