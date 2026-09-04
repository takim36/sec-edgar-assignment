export type SecTickerEntry = {
  cik_str: number;
  ticker: string;
  title: string;
};

export type SecTickerMap = Record<string, SecTickerEntry>;

export type SecFilingColumns = {
  accessionNumber: string[];
  filingDate: string[];
  reportDate: string[];
  acceptanceDateTime: string[];
  act: string[];
  form: string[];
  fileNumber: string[];
  filmNumber: string[];
  items: string[];
  size: number[];
  isXBRL: number[];
  isInlineXBRL: number[];
  primaryDocument: string[];
  primaryDocDescription: string[];
};

export type SecSubmissionFile = {
  name: string;
  filingCount: number;
  filingFrom: string;
  filingTo: string;
};

export type SecCompanySubmission = {
  cik: string;
  entityType: string;
  sic: string;
  sicDescription: string;
  name: string;
  tickers: string[];
  exchanges: string[];
  filings: {
    recent: SecFilingColumns;
    files?: SecSubmissionFile[];
  };
};

export type SecHistoricalSubmission = SecFilingColumns;
