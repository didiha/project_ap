import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "./api";

export function usePayments() {
    return useQuery({
        queryKey: ["payments"],
        queryFn: fetchPayments,
        staleTime: 1000 * 60,
    })
}