import { ReactNode } from "react";

export const metadata = {
  title: "Entrar - EasyFit",
  description: "Gerencie suas preferências e informações da conta",
};

export default function EntrarLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
