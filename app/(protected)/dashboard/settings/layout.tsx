// app/(protected)/dashboard/settings/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "Configurações - EasyFit",
  description: "Gerencie suas preferências e informações da conta",
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>;
}
