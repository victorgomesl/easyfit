import { ReactNode } from "react";

export const metadata = {
  title: "Cadastrar - EasyFit",
  description: "Gerencie suas preferências e informações da conta",
};

export default function CadastrarLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
