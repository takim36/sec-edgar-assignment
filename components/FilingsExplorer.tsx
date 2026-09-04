"use client";

import { useState } from "react";
import { useFilings } from "@/hooks/use-filings";
import { useFilingsSummary } from "@/hooks/use-filings-summary";
import { FilingsFilters } from "@/components/filings/filters";
import { FilingsTable } from "@/components/filings/table";
import { Pagination } from "@/components/filings/pagination";
import { SummarySection } from "@/components/filings/summary";

export function FilingsExplorer() {
  const [ticker, setTicker] = useState("AAPL");
  const [form, setForm] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const {
    data: summaryQuery,
    error: summaryError,
    isLoading: summaryIsLoading,
  } = useFilingsSummary();
  const {
    data: filingsQuery,
    error: filingsError,
    isLoading: filingsIsLoading,
  } = useFilings({ ticker, form, sort, page });

  const resetPage = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            SEC EDGAR
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Filing Explorer
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Browse normalized company filings and compare filing activity over
            the last 12 months.
          </p>
        </header>

        <SummarySection
          companies={summaryQuery?.companies}
          error={summaryError?.message}
          isLoading={summaryIsLoading}
        />

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Company filings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filingsQuery
                    ? `${filingsQuery.company.name} · CIK ${filingsQuery.company.cik}`
                    : "Select filters to browse filings."}
                </p>
              </div>

              <FilingsFilters
                ticker={ticker}
                form={form}
                sort={sort}
                onTickerChange={(value) => resetPage(setTicker, value)}
                onFormChange={(value) => resetPage(setForm, value)}
                onSortChange={(value) => resetPage(setSort, value)}
              />
            </div>
          </div>

          {filingsError ? (
            <p className="m-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {filingsError.message}
            </p>
          ) : filingsIsLoading ? (
            <p className="mb-8 p-5 text-sm text-slate-500">Loading...</p>
          ) : filingsQuery ? (
            <>
              <FilingsTable filings={filingsQuery.filings} />
              <Pagination {...filingsQuery.pagination} onPageChange={setPage} />
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
}
