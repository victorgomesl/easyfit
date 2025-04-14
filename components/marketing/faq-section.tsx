import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Perguntas frequentes</h2>
          <p className="text-xl text-muted-foreground">Tudo o que você precisa saber sobre o EasyFit</p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <FaqItem
              value="item-1"
              question="Como funciona o EasyFit?"
              answer="O EasyFit é uma aplicação simples e intuitiva que permite registrar suas refeições diárias. Você pode cadastrar alimentos, especificar o tipo de refeição (café da manhã, almoço, lanche ou jantar) e acompanhar seu consumo calórico diário e semanal."
            />
            <FaqItem
              value="item-2"
              question="O EasyFit é realmente gratuito?"
              answer="Sim! O EasyFit é 100% gratuito e sempre será. Não há funcionalidades pagas ou limitações na versão gratuita."
            />
            <FaqItem
              value="item-3"
              question="Posso usar o EasyFit em dispositivos móveis?"
              answer="Sim, o EasyFit é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores."
            />
            <FaqItem
              value="item-4"
              question="Como o EasyFit calcula as calorias?"
              answer="O usuário ao cadastrar sua refeição, coloca as calorias e o sistema calcula tudo de forma automática."
            />
            <FaqItem
              value="item-5"
              question="Posso exportar meus dados do EasyFit?"
              answer="Sim, você pode exportar seus dados em formato PDF para análise externa ou para compartilhar com seu nutricionista."
            />
          </Accordion>
        </div>
      </div>
    </section>
  )
}

interface FaqItemProps {
  value: string
  question: string
  answer: string
}

function FaqItem({ value, question, answer }: FaqItemProps) {
  return (
    <AccordionItem value={value} className="border-b-2">
      <AccordionTrigger className="text-xl font-medium py-6">{question}</AccordionTrigger>
      <AccordionContent className="text-lg pb-6">{answer}</AccordionContent>
    </AccordionItem>
  )
}
