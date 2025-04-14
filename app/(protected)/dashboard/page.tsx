import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import TableListMeal from "@/components/dashboard/table-list-meal"
import CardCaloriesDay from "@/components/dashboard/card-calories-day"
import CardCaloriesWeek from "@/components/dashboard/card-calories-week"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-border bg-card p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1.5">
            Acompanhe seu consumo calórico e gerencie suas refeições
          </p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardCaloriesDay />
            <CardCaloriesWeek />
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm">
            <TableListMeal />
          </div>
        </div>
      </main>
    </div>
  )
}
