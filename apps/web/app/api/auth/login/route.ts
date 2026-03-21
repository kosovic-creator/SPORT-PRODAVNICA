import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@web/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  if (!email || !password) {
    return NextResponse.json({ error: "Sva polja su obavezna." }, { status: 400 });
  }

  const korisnik = await prisma.korisnik.findUnique({ where: { email } });
  if (!korisnik || !korisnik.lozinka) {
    return NextResponse.json({ error: "Pogrešan email ili lozinka." }, { status: 401 });
  }

  const isValid = await compare(password, korisnik.lozinka);
  if (!isValid) {
    return NextResponse.json({ error: "Pogrešan email ili lozinka." }, { status: 401 });
  }

  // TODO: Implementiraj sesiju/cookie/token po potrebi
  return NextResponse.json({ success: true, korisnik: { id: korisnik.id, email: korisnik.email, ime: korisnik.ime } });
}
