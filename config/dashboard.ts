import { LayoutDashboard, Settings, LifeBuoy } from "lucide-react";

export const dashboardConfig = {
  navItems: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Suporte",
      href: "",
      icon: LifeBuoy,
      disabled: true,
    },
  ],
};
