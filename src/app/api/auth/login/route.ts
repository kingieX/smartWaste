// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mockUsers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Login successful",
    role: user.role,
  });
}
