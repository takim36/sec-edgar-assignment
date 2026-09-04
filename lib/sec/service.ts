import type { Filing, CompanySummary } from "@/types/filing";
import {
  fetchCompanySubmission,
  fetchHistoricalSubmission,
  getTickerEntry,
} from "./client";
import { normalizeFilings } from "./normalize";

export class CompanyNotFoundError extends Error {
  constructor(ticker: string) {
    super(`No SEC company found for ticker ${ticker.toUpperCase()}`);
    this.name = "CompanyNotFoundError";
  }
}

export async function getCompanyFilings(ticker: string): Promise<{
  ticker: string;
  companyName: string;
  cik: string;
  filings: Filing[];
}> {
  const tickerEntry = await getTickerEntry(ticker);
  if (!tickerEntry) throw new CompanyNotFoundError(ticker);

  const submission = await fetchCompanySubmission(tickerEntry.cik_str);
  const recent = normalizeFilings(
    submission.filings.recent,
    tickerEntry.cik_str,
  );

  const historicalChunks = await Promise.all(
    (submission.filings.files ?? []).map(async (file) =>
      normalizeFilings(
        await fetchHistoricalSubmission(file.name),
        tickerEntry.cik_str,
      ),
    ),
  );

  const filings = [...recent, ...historicalChunks.flat()].sort((a, b) =>
    b.filingDate.localeCompare(a.filingDate),
  );

  return {
    ticker: tickerEntry.ticker.toUpperCase(),
    companyName: submission.name || tickerEntry.title,
    cik: String(tickerEntry.cik_str),
    filings,
  };
}

export async function getCompanySummary(
  ticker: string,
): Promise<CompanySummary> {
  const company = await getCompanyFilings(ticker);
  const cutoff = new Date();
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1);
  const cutoffDate = cutoff.toISOString().slice(0, 10);

  const last12Months = company.filings.filter(
    (filing) => filing.filingDate >= cutoffDate,
  );

  const filingsByForm = last12Months.reduce<Record<string, number>>(
    (counts, filing) => {
      counts[filing.form] = (counts[filing.form] ?? 0) + 1;
      return counts;
    },
    {},
  );

  const latest10K =
    company.filings.find((filing) => filing.form === "10-K")?.filingDate ??
    null;

  return {
    ticker: company.ticker,
    companyName: company.companyName,
    cik: company.cik,
    filingsByForm,
    latest10K,
  };
}
