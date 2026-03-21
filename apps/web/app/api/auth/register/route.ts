import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@web/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const ime = data.get("ime") as string;
  // Removed prezime, not in Korisnik model
  if (!email || !password || !ime) {
    return NextResponse.json({ error: "Sva polja su obavezna." }, { status: 400 });
  }

  const postoji = await prisma.korisnik.findUnique({ where: { email } });
  if (postoji) {
    return NextResponse.json({ error: "Email je već registrovan." }, { status: 400 });
  }

  const hashed = await hash(password, 10);
  await prisma.korisnik.create({
    data: {
      email,
      lozinka: hashed,
      ime,
    },
  });

  return NextResponse.json({ success: true });
}
