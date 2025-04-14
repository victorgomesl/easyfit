"use client"

import { useState } from "react"
import { toast } from "sonner"
import { AlertCircle, Loader2, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DialogDeleteMealProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealId: string
  mealName: string
  onMealDeleted: () => void
}

export default function DialogDeleteMeal({
  open,
  onOpenChange,
  mealId,
  mealName,
  onMealDeleted,
}: DialogDeleteMealProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/meals/${mealId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Erro ao excluir refeição")
      }

      toast.success("Refeição excluída com sucesso")
      onOpenChange(false)
      onMealDeleted()
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir refeição")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={(newOpen) => !isDeleting && onOpenChange(newOpen)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDialogTitle>Excluir refeição</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Você tem certeza que deseja excluir a refeição <span className="font-medium">{mealName}</span>? Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-1.5"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Excluir</span>
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
