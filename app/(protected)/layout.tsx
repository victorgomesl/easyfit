"use client";

import type React from "react";
import NavbarMenu from "@/components/dashboard/navbar-menu";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <NavbarMenu />
      <SidebarInset>{children}</SidebarInset>
      <Toaster richColors />
    </div>
  );
}
