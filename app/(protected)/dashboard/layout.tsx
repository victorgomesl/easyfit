// app/(protected)/dashboard/layout.tsx
import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard - EasyFit",
  description: "Acompanhe seu consumo calórico e gerencie suas refeições no EasyFit.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
}
