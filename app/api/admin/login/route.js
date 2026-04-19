import { NextResponse } from "next/server";
import { checkPassword, setAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { password } = await req.json();
    if (!checkPassword(password)) {
      return NextResponse.json({ ok: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
    setAuthCookie();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "요청을 처리할 수 없습니다." }, { status: 400 });
  }
}
