"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dashboardConfig } from "@/config/dashboard";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function NavbarMenu() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const [userProfile, setUserProfile] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    if (!session) {
      setUserProfile(null);
      return;
    }
    async function fetchUserProfile() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data);
        } else {
          console.error("Falha ao buscar perfil do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário", error);
      }
    }
    fetchUserProfile();
  }, [session]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const isActiveRoute = (href: string) => pathname === href;

  const displayName =
    userProfile?.name || (session?.user?.name as string) || "Usuário";
  const displayEmail =
    userProfile?.email || session?.user?.email || "usuario@exemplo.com";

  const userInitials =
    displayName && displayName !== "Usuário"
      ? displayName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "U";

  return (
    <nav
      className={cn(
        "flex flex-col bg-white border-r transition-width duration-300 min-h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl">🍎</span>
          {!collapsed && <span className="text-xl font-bold">EasyFit</span>}
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex-1 p-4">
        <ul className="space-y-1">
          {dashboardConfig.navItems.map((item, index) => {
            const isActive = isActiveRoute(item.href);
            return (
              <li key={index}>
                {item.disabled ? (
                  <div className="flex items-center space-x-2 p-2 rounded text-muted-foreground cursor-not-allowed">
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded hover:bg-muted",
                      isActive && "bg-muted font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col text-sm text-left overflow-hidden">
                  <span className="font-medium truncate">{displayName}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {displayEmail}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
