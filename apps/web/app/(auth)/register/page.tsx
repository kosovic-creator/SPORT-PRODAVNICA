"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@shared-ui/shadcn/card";
import { Button } from "@shared-ui/shadcn/button";
import { Input } from "@shared-ui/shadcn/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (res.redirected) {
      setSuccess("Registracija uspješna! Preusmjeravanje na login...");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }
    const data = await res.json();
    if (data.error) setError(data.error);
    else setSuccess("Registracija uspješna!");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registracija</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <div className="mb-4">
              <Input name="ime" type="text" placeholder="Ime" required />
            </div>
            {/* Prezime field removed, not in Korisnik model */}
            <div className="mb-6">
              <Input name="password" type="password" placeholder="Lozinka" required />
            </div>
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrujem..." : "Registruj se"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
