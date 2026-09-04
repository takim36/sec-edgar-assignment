const COMPANY_OPTIONS = ["AAPL", "SPOT", "JPM"];
const FORM_OPTIONS = ["", "10-K", "10-Q", "8-K", "20-F", "6-K"];

type Props = {
  ticker: string;
  form: string;
  sort: "asc" | "desc";
  onTickerChange: (value: string) => void;
  onFormChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
};

export function FilingsFilters({
  ticker,
  form,
  sort,
  onTickerChange,
  onFormChange,
  onSortChange,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select label="Company" value={ticker} options={COMPANY_OPTIONS} onChange={onTickerChange} />
      <Select label="Form type" value={form} options={FORM_OPTIONS} labels={{ "": "All forms" }} onChange={onFormChange} />
      <Select
        label="Filing date"
        value={sort}
        options={["desc", "asc"]}
        labels={{ desc: "Newest first", asc: "Oldest first" }}
        onChange={(value) => onSortChange(value as "asc" | "desc")}
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  labels = {},
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-xs font-medium text-slate-600">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
      >
        {options.map((option) => (
          <option key={option || "all"} value={option}>
            {labels[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}
