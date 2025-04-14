import { ReactNode } from "react";

export const metadata = {
  title: "Política de Privacidade - EasyFit",
  description: "Gerencie suas preferências e informações da conta",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
