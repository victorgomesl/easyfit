import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍎</span>
            <span className="text-2xl font-bold">EasyFit</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-base text-muted-foreground">
            <Link
              href="/terms"
              className="hover:underline hover:text-primary transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacy"
              className="hover:underline hover:text-primary transition-colors"
            >
              Política de Privacidade
            </Link>
            <a
              href="https://github.com/victorgomesl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-primary transition-colors"
            >
              Desenvolvido por victorgomesl
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
