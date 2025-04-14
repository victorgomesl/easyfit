import { ReactNode } from "react";

export const metadata = {
  title: "Termos de Uso - EasyFit",
  description: "Gerencie suas preferências e informações da conta",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
