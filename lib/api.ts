import type { CompanySummary, Filing } from "@/types/filing";

export type FilingsResponse = {
  company: { ticker: string; name: string; cik: string };
  pagination: {
    page: number;
    total: number;
    totalPages: number;
  };
  filings: Filing[];
};

export type SummaryResponse = {
  companies: CompanySummary[];
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Request failed");
  }

  return data as T;
}

export function fetchFilings(params: {
  ticker: string;
  form: string;
  sort: "asc" | "desc";
  page: number;
}) {
  const search = new URLSearchParams({
    page: String(params.page),
    pageSize: "20",
    sort: params.sort,
  });

  if (params.form) search.set("form", params.form);

  return request<FilingsResponse>(
    `/companies/${encodeURIComponent(params.ticker)}/filings?${search}`,
  );
}

export function fetchSummary(companies = "AAPL,SPOT,JPM") {
  return request<SummaryResponse>(`/filings/summary?companies=${companies}`);
}
