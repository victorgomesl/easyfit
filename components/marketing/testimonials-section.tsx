"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-muted-foreground">
            Pessoas reais, resultados reais
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`repeat-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialProps {
  name: string
  avatar: string
  title: string
  testimonial: string
}

function TestimonialCard({ name, avatar, title, testimonial }: TestimonialProps) {
  return (
    <Card className="min-w-[300px] max-w-[300px] border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lg">{name}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
        <p className="text-base">{testimonial}</p>
      </CardContent>
    </Card>
  )
}

const testimonials = [
  {
    name: "Maria Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Perdeu 10kg em 6 meses",
    testimonial:
      "O EasyFit mudou minha vida! Agora consigo controlar minhas refeições e entender meu consumo calórico. Super recomendo! 🥗❤️",
  },
  {
    name: "João Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Atleta amador",
    testimonial:
      "Excelente app para acompanhar minha alimentação durante os treinos. Interface simples e muito fácil de usar! 🏃‍♂️👍",
  },
  {
    name: "Ana Costa",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Nutricionista",
    testimonial:
      "Recomendo para todos os meus pacientes. O EasyFit é uma ferramenta incrível para educação alimentar. 🍎👩‍⚕️",
  },
  {
    name: "Pedro Oliveira",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Estudante",
    testimonial:
      "App perfeito para quem tem uma rotina corrida. Consigo registrar minhas refeições em segundos! 🕒👌",
  },
  {
    name: "Carla Mendes",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Mãe de 2 filhos",
    testimonial:
      "Estou conseguindo organizar melhor a alimentação da minha família. Muito obrigada EasyFit! 👨‍👩‍👧‍👦❤️",
  },
]
