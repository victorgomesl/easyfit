import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <article className="prose lg:prose-xl space-y-6">
          <h1 className="mb-4">Termos de Uso</h1>
          <p>
            Bem-vindo ao <strong>EasyFit</strong>. Ao acessar e utilizar este
            aplicativo, você concorda com os termos e condições aqui descritos.
            Estes termos regem o uso de todos os serviços oferecidos pelo{" "}
            <strong>EasyFit</strong>.
          </p>
          <p>
            O <strong>EasyFit</strong> tem como objetivo facilitar o controle de
            suas refeições e o acompanhamento das calorias consumidas,
            proporcionando uma experiência intuitiva e prática. É
            responsabilidade do usuário fornecer informações corretas e
            utilizar o aplicativo de forma ética e respeitosa.
          </p>
          <p>
            Reservamo-nos o direito de atualizar ou modificar estes termos a
            qualquer momento, publicando a nova versão no aplicativo. O uso
            continuado do <strong>EasyFit</strong> após quaisquer alterações
            constitui aceitação dos novos termos.
          </p>
          <p>
            Caso você não concorde com algum dos termos estabelecidos, recomendamos
            que interrompa o uso do aplicativo.
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
