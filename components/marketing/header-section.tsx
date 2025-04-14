"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍎</span>
          <span className="text-2xl font-bold">EasyFit</span>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <Button asChild variant="outline" className="text-base">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-base">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-base">Registrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
