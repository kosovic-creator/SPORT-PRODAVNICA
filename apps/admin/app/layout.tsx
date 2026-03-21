import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin App",
  description: "Admin aplikacija za SPORT PRODAVNICA monorepo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
