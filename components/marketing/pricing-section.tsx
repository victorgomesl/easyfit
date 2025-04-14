import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function Pricing() {
  return (
    <section className="py-32 md:py-40 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Preço
          </h2>
          <p className="text-xl text-muted-foreground">
            Sem surpresas, sem custos escondidos
          </p>
        </div>
        <div className="mx-auto max-w-md">
          <Card className="border-none shadow-lg transform transition-transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <span className="text-5xl">🍪</span>
              </div>
              <CardTitle className="text-3xl font-bold">
                Grátis para sempre
              </CardTitle>
              <CardDescription className="text-2xl font-medium mt-2">
                R$ 0,00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <PricingFeature text="Cadastro ilimitado de refeições" />
                <PricingFeature text="Acompanhamento de calorias" />
                <PricingFeature text="Relatórios semanais" />
                <PricingFeature text="Acesso a todas as funcionalidades" />
              </ul>
            </CardContent>
            <CardFooter className="pb-8">
              <Button className="w-full text-lg py-6">Começar agora</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="rounded-full bg-green-100 p-1">
        <span className="text-lg">✅</span>
      </div>
      <span className="text-lg">{text}</span>
    </li>
  )
}
