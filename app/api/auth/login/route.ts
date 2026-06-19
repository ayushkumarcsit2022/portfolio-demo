import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "gbenga-secure-admin-2026";
    
    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: "Invalid credential protocol" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, error: "System failure" }, { status: 500 });
  }
}
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return NextResponse.json({ authenticated: session?.value === "authenticated" });
}
