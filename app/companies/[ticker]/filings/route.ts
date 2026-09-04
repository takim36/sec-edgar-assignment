import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/http";
import { getCompanyFilings } from "@/lib/sec/service";

const DEFAULT_PAGE_SIZE = 20;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ ticker: string }> },
) {
  try {
    const { ticker } = await context.params;
    const params = request.nextUrl.searchParams;
    const form = params.get("form")?.trim().toUpperCase() ?? "";
    const sort = params.get("sort")?.toLowerCase() === "asc" ? "asc" : "desc";
    const pageSize =
      Number.parseInt(params.get("pageSize") ?? String(DEFAULT_PAGE_SIZE)) ??
      DEFAULT_PAGE_SIZE;
    const page = Number.parseInt(params.get("page") ?? "1") || 1;

    const company = await getCompanyFilings(ticker);
    const filtered = form
      ? company.filings.filter((filing) => filing.form.toUpperCase() === form)
      : company.filings;

    const sorted = [...filtered].sort((a, b) =>
      sort === "asc"
        ? a.filingDate.localeCompare(b.filingDate)
        : b.filingDate.localeCompare(a.filingDate),
    );

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;

    return NextResponse.json({
      company: {
        ticker: company.ticker,
        name: company.companyName,
        cik: company.cik,
      },
      pagination: {
        page,
        total,
        totalPages,
      },
      filings: sorted.slice(start, start + pageSize),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
