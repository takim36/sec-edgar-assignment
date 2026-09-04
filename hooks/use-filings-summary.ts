import { useQuery } from "@tanstack/react-query";
import { fetchSummary } from "@/lib/api";

export function useFilingsSummary() {
  return useQuery({
    queryKey: ["filings-summary"],
    queryFn: () => fetchSummary(),
  });
}
