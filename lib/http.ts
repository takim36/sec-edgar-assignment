import { NextResponse } from "next/server";
import { CompanyNotFoundError } from "@/lib/sec/service";

export function errorResponse(error: unknown) {
  if (error instanceof CompanyNotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  console.error(error);
  return NextResponse.json(
    { error: "Unable to fetch SEC filing data right now." },
    { status: 502 },
  );
}
