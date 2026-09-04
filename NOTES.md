# NOTES

## Scope completed

The requested backend endpoints and frontend views are implemented. The solution supports arbitrary company tickers present in the SEC ticker mapping, not only the three example companies.

## Choices made for a four-hour assignment

- Kept the stack to Next.js + React + Tailwind rather than introducing a separate backend framework.
- Used Next.js server-side fetch caching to reduce repeated traffic to SEC endpoints.
- Loaded historical submission chunks for correctness, even though most UI usage is recent filings.
- Used exact form matching for filters because EDGAR has many related but distinct forms (`10-K`, `10-K/A`, etc.).

## What I would add with more time

- A free-text ticker input with autocomplete rather than only preset UI examples.
- Add unit and API test
- Add Page size as select option from table sizing in UI
