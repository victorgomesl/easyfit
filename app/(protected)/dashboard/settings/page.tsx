import UserSettings from "@/components/dashboard/settings/user-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-border bg-card p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground mt-1.5">Gerencie suas preferências e informações da conta</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <UserSettings />
        </div>
      </main>
    </div>
  )
}
