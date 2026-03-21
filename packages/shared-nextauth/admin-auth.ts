import "dotenv/config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@admin/lib/prisma";
import { compare } from "bcryptjs";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const admin = await prisma.korisnikAdmin.findUnique({
          where: { email: credentials.email },
        });
        if (!admin) return null;
        if (!(await compare(credentials.password, admin.lozinka))) return null;
        return {
          id: admin.id,
          email: admin.email,
          name: admin.ime + " " + admin.prezime,
          role: admin.uloga,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // tip je sada ispravan
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // @ts-expect-error: user may be undefined
        session.user.id = token.id;
        // @ts-expect-error: user may be undefined
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error: role may not exist on User
        token.role = user.role;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
