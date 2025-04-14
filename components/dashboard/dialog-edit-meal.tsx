"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const mealSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  calories: z.coerce.number().min(1, "Calorias deve ser pelo menos 1"),
  dateTime: z.string().min(1, "Data e hora são obrigatórias"),
  type: z.enum(["Café da manhã", "Almoço", "Lanche da tarde", "Janta"], {
    required_error: "Selecione um tipo de refeição",
  }),
})

type MealFormData = z.infer<typeof mealSchema>

interface DialogEditMealProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meal: {
    id: string
    name: string
    description?: string
    calories: number
    dateTime: string
    type: "Café da manhã" | "Almoço" | "Lanche da tarde" | "Janta"
  }
  onMealUpdated: () => void
}

export default function DialogEditMeal({ open, onOpenChange, meal, onMealUpdated }: DialogEditMealProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr)
      return date.toISOString().slice(0, 16)
    } catch (e) {
      return dateTimeStr.substring(0, 16)
    }
  }

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: meal.name,
      description: meal.description || "",
      calories: meal.calories,
      dateTime: formatDateTime(meal.dateTime),
      type: meal.type,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: meal.name,
        description: meal.description || "",
        calories: meal.calories,
        dateTime: formatDateTime(meal.dateTime),
        type: meal.type,
      })
      setError(null)
    }
  }, [meal, open, form])

  async function onSubmit(data: MealFormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/meals/${meal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Erro ao atualizar refeição")
      }

      toast.success("Refeição atualizada com sucesso!")
      onOpenChange(false)
      onMealUpdated()
    } catch (error: any) {
      setError(error.message || "Erro ao atualizar refeição")
      toast.error(error.message || "Erro ao atualizar refeição")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isSubmitting) {
          onOpenChange(newOpen)
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Refeição</DialogTitle>
          <DialogDescription>Atualize os detalhes da sua refeição registrada.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Refeição</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Salada de frango" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva os ingredientes ou detalhes da refeição"
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Opcional: adicione detalhes sobre sua refeição</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorias</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Refeição</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Café da manhã">Café da manhã</SelectItem>
                        <SelectItem value="Almoço">Almoço</SelectItem>
                        <SelectItem value="Lanche da tarde">Lanche da tarde</SelectItem>
                        <SelectItem value="Janta">Janta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
