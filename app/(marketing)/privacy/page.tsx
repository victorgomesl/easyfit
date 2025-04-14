import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <article className="prose lg:prose-xl space-y-6">
          <h1 className="mb-4">Política de Privacidade</h1>
          <p>
            No <strong>EasyFit</strong>, sua privacidade é prioridade. Esta
            política descreve como coletamos, utilizamos, armazenamos e protegemos
            suas informações pessoais.
          </p>
          <p>
            Coletamos dados essenciais, como <strong>nome</strong> e{" "}
            <strong>e-mail</strong>, para a criação e manutenção da sua conta.
            Esses dados são utilizados para personalizar sua experiência e para
            melhorar os nossos serviços.
          </p>
          <p>
            Nós nos comprometemos a não compartilhar suas informações com terceiros
            sem o seu consentimento, exceto quando exigido por lei ou para a
            prestação de serviços essenciais.
          </p>
          <p>
            Ao utilizar o <strong>EasyFit</strong>, você concorda com as práticas
            descritas nesta política. Se você não concordar com essa política,
            pedimos que não utilize nossos serviços.
          </p>
        </article>
        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
