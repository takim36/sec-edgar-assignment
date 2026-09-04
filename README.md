# SEC EDGAR Filing Explorer

A small full-stack TypeScript assignment built with **Next.js App Router**, **React**, and **Tailwind CSS**. It resolves stock tickers to SEC CIKs, fetches EDGAR submission history, normalizes the SEC's columnar filing format, exposes the requested APIs, and renders a simple filing explorer + company summary UI.

## Features

- Ticker → CIK resolution using SEC `company_tickers.json`
- Full company submission history from `data.sec.gov/submissions/CIK##########.json`
- Historical submission chunk support via `filings.files`
- Columnar SEC data normalized to filing objects
- Original SEC filing document links
- Form filtering, filing-date sorting and pagination
- 12-month filing counts grouped by form type
- Latest 10-K date per company
- Responsive React UI with Tailwind CSS
- SEC-friendly declared `User-Agent` header and Next.js fetch caching

## API

### `GET /companies/:ticker/filings`

Query parameters:

- `form` — optional exact form type, e.g. `10-K`, `10-Q`, `8-K`
- `page` — default `1`
- `pageSize` — default `20`, maximum `100`
- `sort` — `asc` or `desc`, default `desc`

Examples:

```text
/companies/AAPL/filings
/companies/AAPL/filings?form=10-K&page=1&pageSize=20&sort=desc
/companies/SPOT/filings?form=20-F
```

### `GET /filings/summary`

Pass comma-separated tickers in the `companies` parameter. Up to 20 are accepted per request.

```text
/filings/summary?companies=AAPL,SPOT,JPM
```

For each company, the endpoint returns filing counts per form type over the previous 12 months and the filing date of its latest `10-K`.

## Setup

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Design notes

The app intentionally keeps dependencies light. Next.js serves both the backend Route Handlers and React frontend, while Tailwind handles styling. SEC fetches are kept in `lib/sec` so API routes remain small and HTTP concerns are separated from EDGAR-specific parsing.
