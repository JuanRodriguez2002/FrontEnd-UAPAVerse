import { NextRequest, NextResponse } from "next/server";
import { getStandsCatalog } from "@/features/metaverso/services/stands-api";

export async function GET(request: NextRequest) {
  const result = await getStandsCatalog(request.nextUrl.searchParams);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
