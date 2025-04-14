"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute left-1/4 top-1/4 text-5xl md:text-7xl animate-float-slow">🍎</div>
        <div className="absolute left-1/3 top-1/2 text-5xl md:text-7xl animate-float-medium">🍌</div>
        <div className="absolute left-2/3 top-1/3 text-5xl md:text-7xl animate-float-fast">🥑</div>
        <div className="absolute left-1/5 top-2/3 text-5xl md:text-7xl animate-float-medium">🥕</div>
        <div className="absolute left-3/4 top-1/4 text-5xl md:text-7xl animate-float-slow">🥗</div>
        <div className="absolute left-1/2 top-3/4 text-5xl md:text-7xl animate-float-fast">🍇</div>
        <div className="absolute left-3/5 top-1/5 text-5xl md:text-7xl animate-float-medium">🥦</div>
        <div className="absolute left-4/5 top-2/5 text-5xl md:text-7xl animate-float-slow">🍓</div>
      </div>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6 px-4 py-2 text-base font-medium">Sempre grátis</Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Controle sua alimentação com EasyFit
          </h1>
          <p className="mb-10 text-xl text-muted-foreground md:text-2xl">
            Registre suas refeições, acompanhe calorias e organize sua rotina alimentar de forma simples e gratuita.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {!session && (
              <Link href="/login">
                <Button size="lg" className="gap-2 text-lg px-4 py-3 sm:px-8 sm:py-6">
                  Começar agora
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link href="#feature-section">
              <Button size="lg" variant="outline" className="text-lg px-4 py-3 sm:px-8 sm:py-6">
                Saiba mais
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
