"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@shared-ui/shadcn/card";
import { Button } from "@shared-ui/shadcn/button";
import { Input } from "@shared-ui/shadcn/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
      setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const { signIn } = await import("next-auth/react");
      const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
    });
    setLoading(false);
      if (res?.error) setError("Pogrešan email ili lozinka.");
      else if (res?.ok) router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Prijava</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <div className="mb-6">
              <Input name="password" type="password" placeholder="Lozinka" required />
            </div>
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Prijavljujem..." : "Prijavi se"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
