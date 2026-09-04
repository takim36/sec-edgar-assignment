import type { CompanySummary } from "@/types/filing";
import { formatDate } from "@/lib/utils/date";

type Props = {
  companies?: CompanySummary[];
  error?: string;
  isLoading?: boolean;
};

export function SummarySection({ companies, error, isLoading }: Props) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-950">
          12-month summary
        </h2>
        <p className="text-sm text-slate-500">
          Apple, Spotify and JPMorgan Chase
        </p>
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {companies?.map((company) => (
            <SummaryCard key={company.ticker} company={company} />
          ))}
        </div>
      )}
    </section>
  );
}

function SummaryCard({ company }: { company: CompanySummary }) {
  const forms = Object.entries(company.filingsByForm)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-950">{company.ticker}</p>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {company.companyName}
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-right">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Latest 10-K
          </p>
          <p className="text-xs font-semibold text-slate-800">
            {formatDate(company.latest10K)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {forms.map(([form, count]) => (
          <span
            key={form}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
          >
            {form}: <strong>{count}</strong>
          </span>
        ))}
      </div>
    </article>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-sm text-red-600">{message}</p>;
}
