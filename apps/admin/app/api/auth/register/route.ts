
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@admin/lib/prisma";


export async function POST(req: NextRequest) {
  const data = await req.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const ime = data.get("ime") as string;
  const prezime = data.get("prezime") as string;

  if (!email || !password || !ime || !prezime) {
    return NextResponse.json({ error: "Sva polja su obavezna." }, { status: 400 });
  }

  const postoji = await prisma.korisnikAdmin.findUnique({ where: { email } });
  if (postoji) {
    return NextResponse.json({ error: "Email je već registrovan." }, { status: 400 });
  }

  const hashed = await hash(password, 10);
  await prisma.korisnikAdmin.create({
    data: {
      email,
      lozinka: hashed,
      ime,
      prezime,
    },
  });

  return NextResponse.json({ success: true });
}
