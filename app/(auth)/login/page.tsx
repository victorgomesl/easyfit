"use client";

import { Toaster } from "sonner";
import UserAuthForm from "@/components/forms/user-auth-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <Icons.chevronLeft className="mr-1 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <span className="text-3xl">🍎</span>
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta!</CardTitle>
          <CardDescription>
            Informe seu e-mail para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm type="login" />
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com os{" "}
            <Link href="/termos" className="underline hover:text-primary">
              Termos de Uso
            </Link>{" "}
            .
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="underline hover:text-primary">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
}
