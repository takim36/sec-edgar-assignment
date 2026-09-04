export type Filing = {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  acceptanceDateTime: string;
  act: string;
  form: string;
  fileNumber: string;
  filmNumber: string;
  items: string;
  size: number;
  isXBRL: boolean;
  isInlineXBRL: boolean;
  primaryDocument: string;
  primaryDocDescription: string;
  documentUrl: string;
};

export type CompanySummary = {
  ticker: string;
  companyName: string;
  cik: string;
  filingsByForm: Record<string, number>;
  latest10K: string | null;
};
