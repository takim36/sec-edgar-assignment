import type { Filing } from "@/types/filing";
import { formatDate } from "@/lib/utils/date";

export function FilingsTable({ filings }: { filings: Filing[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <Header>Filed</Header>
            <Header>Form</Header>
            <Header>Report date</Header>
            <Header>Description</Header>
            <th className="px-5 py-3 text-right font-semibold">Document</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {filings.map((filing) => (
            <FilingRow key={filing.accessionNumber} filing={filing} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-3 font-semibold">{children}</th>;
}

function FilingRow({ filing }: { filing: Filing }) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
        {formatDate(filing.filingDate)}
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-800">
          {filing.form}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-slate-600">
        {formatDate(filing.reportDate)}
      </td>
      <td className="max-w-md px-5 py-4 text-slate-600">
        <div className="line-clamp-2">
          {filing.primaryDocDescription || filing.primaryDocument || "—"}
        </div>
        <div className="mt-1 font-mono text-[11px] text-slate-400">
          {filing.accessionNumber}
        </div>
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-right">
        <a
          href={filing.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900"
        >
          Open SEC ↗
        </a>
      </td>
    </tr>
  );
}
