import { Card, CardContent, CardHeader, CardTitle } from "@shared-ui/shadcn/card";
import { Button } from "@shared-ui/shadcn/button";
import { Input } from "@shared-ui/shadcn/input";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Prijava (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="post" action="/api/auth/signin/credentials">
            <input type="hidden" name="callbackUrl" value="/" />
            <div className="mb-4">
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <div className="mb-6">
              <Input name="password" type="password" placeholder="Lozinka" required />
            </div>
            <Button type="submit" className="w-full">Prijavi se</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
