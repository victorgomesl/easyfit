// app/layout.tsx
import "./globals.css";
import { Nunito } from "next/font/google"
import { Providers } from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata = {
  title: "EasyFit - Registre suas refeições e acompanhe calorias",
  description: "Registre suas refeições, acompanhe calorias e organize sua rotina alimentar de forma simples e gratuita.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} min-h-screen bg-gray-50 text-gray-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
