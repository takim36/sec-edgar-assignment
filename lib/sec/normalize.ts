import type { Filing } from "@/types/filing";
import type { SecFilingColumns } from "./types";

export function buildDocumentUrl(
  cik: string | number,
  accessionNumber: string,
  primaryDocument: string,
): string {
  const cikWithoutLeadingZeroes = String(Number(cik));
  const accessionWithoutDashes = accessionNumber.replaceAll("-", "");
  return `https://www.sec.gov/Archives/edgar/data/${cikWithoutLeadingZeroes}/${accessionWithoutDashes}/${primaryDocument}`;
}

export function normalizeFilings(
  columns: SecFilingColumns,
  cik: string | number,
): Filing[] {
  return columns.accessionNumber.map((accessionNumber, index) => ({
    accessionNumber,
    filingDate: columns.filingDate[index] ?? "",
    reportDate: columns.reportDate[index] ?? "",
    acceptanceDateTime: columns.acceptanceDateTime[index] ?? "",
    act: columns.act[index] ?? "",
    form: columns.form[index] ?? "",
    fileNumber: columns.fileNumber[index] ?? "",
    filmNumber: columns.filmNumber[index] ?? "",
    items: columns.items[index] ?? "",
    size: columns.size[index] ?? 0,
    isXBRL: Boolean(columns.isXBRL[index]),
    isInlineXBRL: Boolean(columns.isInlineXBRL[index]),
    primaryDocument: columns.primaryDocument[index] ?? "",
    primaryDocDescription: columns.primaryDocDescription[index] ?? "",
    documentUrl: buildDocumentUrl(
      cik,
      accessionNumber,
      columns.primaryDocument[index] ?? "",
    ),
  }));
}
