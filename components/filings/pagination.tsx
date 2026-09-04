type Props = {
  page: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, total, totalPages, onPageChange }: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500">{total.toLocaleString()} filings · page {page} of {totalPages}</p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-slate-300 px-3 py-2 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg bg-slate-900 px-3 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
