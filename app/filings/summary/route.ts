import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/lib/http";
import { getCompanySummary } from "@/lib/sec/service";

const MAX_COMPANIES = 20;

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get("companies") ?? "";
    const companies = [
      ...new Set(
        raw
          .split(",")
          .map((ticker) => ticker.trim().toUpperCase())
          .filter(Boolean),
      ),
    ];

    if (companies.length === 0) {
      return NextResponse.json(
        { error: "Provide companies as a comma-separated query parameter." },
        { status: 400 },
      );
    }

    if (companies.length > MAX_COMPANIES) {
      return NextResponse.json(
        {
          error: `A maximum of ${MAX_COMPANIES} companies is supported per request.`,
        },
        { status: 400 },
      );
    }

    const summaries = await Promise.all(
      companies.map((ticker) => getCompanySummary(ticker)),
    );

    return NextResponse.json({
      companies: summaries,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
