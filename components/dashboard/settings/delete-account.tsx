"use client"

import { useState } from "react"
import { toast } from "sonner"
import { signOut } from "next-auth/react"
import { AlertTriangle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ConfirmModal from "./confirm-modal"

export default function DeleteAccount() {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Erro ao deletar a conta")
      }
      toast.success("Conta deletada com sucesso!")
      await signOut({ callbackUrl: "/" })
    } catch (error: any) {
      toast.error(error.message || "Erro ao deletar a conta")
      setLoading(false)
      setModalOpen(false)
    }
  }

  return (
    <Card className="border-destructive/20">
      <CardHeader className="border-b bg-destructive/5 text-destructive">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle className="text-lg">Zona de Perigo</CardTitle>
        </div>
        <CardDescription className="text-destructive/80">
          Ao excluir sua conta, todos os seus dados serão permanentemente removidos.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          Antes de prosseguir, entenda que esta ação não pode ser desfeita. Todos os seus dados, incluindo histórico de
          refeições, configurações e preferências serão excluídos permanentemente.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/20 py-4">
        <Button variant="destructive" onClick={() => setModalOpen(true)} disabled={loading} className="gap-2">
          <Trash2 className="h-4 w-4" />
          {loading ? "Processando..." : "Excluir Minha Conta"}
        </Button>
      </CardFooter>

      <ConfirmModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Excluir conta permanentemente?"
        description="Esta ação não pode ser desfeita. Sua conta e todos os dados associados serão permanentemente excluídos."
        onConfirm={handleDelete}
        isLoading={loading}
        variant="destructive"
      />
    </Card>
  )
}
