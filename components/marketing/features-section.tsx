import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Features() {
  return (
    <section className="py-32 md:py-40 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Como usar
          </h2>
          <p className="text-xl text-muted-foreground">
            Controle seu gasto calórico diário ou semanal de forma fácil
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <FeatureCard
            emoji="👤"
            title="Passo 1"
            description="Faça login no MealTracker utilizando seu email"
          />
          <FeatureCard
            emoji="🍉"
            title="Passo 2"
            description="Cadastre sua refeição de forma simples e rápida"
          />
          <FeatureCard
            emoji="❤️"
            title="Passo 3"
            description="Acompanhe seu consumo de calorias diário e semanal e melhore sua saúde"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-lg transform transition-transform hover:scale-105">
      <CardHeader className="text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="text-5xl">{emoji}</span>
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent className="text-center text-lg">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
