import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchFilings } from "@/lib/api";

export function useFilings(params: {
  ticker: string;
  form: string;
  sort: "asc" | "desc";
  page: number;
}) {
  return useQuery({
    queryKey: ["filings", params],
    queryFn: () => fetchFilings(params),
    placeholderData: keepPreviousData,
  });
}
