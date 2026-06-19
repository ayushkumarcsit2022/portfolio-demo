import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData, savePortfolioData } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getPortfolioData());
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized access detected" }, { status: 401 });
    }
    
    const data = await request.json();
    const success = await savePortfolioData(data);
    
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Failed to write to datastore" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: "System failure" }, { status: 500 });
  }
}
