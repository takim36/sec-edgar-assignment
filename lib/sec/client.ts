import type {
  SecCompanySubmission,
  SecHistoricalSubmission,
  SecTickerEntry,
  SecTickerMap,
} from "./types";

const TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const SUBMISSIONS_BASE = "https://data.sec.gov/submissions";

const headers = () => ({
  "User-Agent":
    process.env.SEC_USER_AGENT ??
    "sec-edgar-coding-assignment/1.0 contact@example.com",
  Accept: "application/json",
  "Accept-Encoding": "gzip, deflate",
});

async function secFetch<T>(url: string, revalidate = 3600): Promise<T> {
  const response = await fetch(url, {
    headers: headers(),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`SEC request failed (${response.status}) for ${url}`);
  }

  return response.json() as Promise<T>;
}

export function padCik(cik: string | number): string {
  return String(cik).padStart(10, "0");
}

export async function getTickerEntry(
  ticker: string,
): Promise<SecTickerEntry | null> {
  const tickerMap = await secFetch<SecTickerMap>(TICKERS_URL, 86400);
  return (
    Object.values(tickerMap).find(
      (entry) => entry.ticker.toUpperCase() === ticker,
    ) ?? null
  );
}

export async function fetchCompanySubmission(
  cik: string | number,
): Promise<SecCompanySubmission> {
  return secFetch<SecCompanySubmission>(
    `${SUBMISSIONS_BASE}/CIK${padCik(cik)}.json`,
    900,
  );
}

export async function fetchHistoricalSubmission(
  fileName: string,
): Promise<SecHistoricalSubmission> {
  // fileName comes from the trusted SEC submissions response.
  return secFetch<SecHistoricalSubmission>(
    `${SUBMISSIONS_BASE}/${fileName}`,
    86400,
  );
}
