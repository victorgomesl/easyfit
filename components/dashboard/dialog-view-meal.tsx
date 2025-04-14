"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Flame } from 'lucide-react'
import { cn } from "@/lib/utils"

interface DialogViewMealProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meal: {
    id: string
    name: string
    description?: string
    calories: number
    dateTime: string
    type: "Café da manhã" | "Almoço" | "Lanche da tarde" | "Janta"
  } | null
}

export default function DialogViewMeal({ open, onOpenChange, meal }: DialogViewMealProps) {
  if (!meal) return null

  function getMealTypeBadgeColor(type: string) {
    switch (type) {
      case "Café da manhã":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Almoço":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Lanche da tarde":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Janta":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  function formatDateTime(dateTimeStr: string) {
    try {
      const date = new Date(dateTimeStr)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")

      return {
        date: `${day}/${month}/${year}`,
        time: `${hours}:${minutes}`,
      }
    } catch (e) {
      return { date: "Data inválida", time: "Hora inválida" }
    }
  }

  const { date, time } = formatDateTime(meal.dateTime)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{meal.name}</DialogTitle>
          <DialogDescription>Detalhes da refeição</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn(getMealTypeBadgeColor(meal.type), "text-sm px-3 py-1")}>
              {meal.type}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium">{meal.calories.toLocaleString()} kcal</span>
            </div>
          </div>

          {meal.description && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Descrição</h4>
              <p className="text-sm text-muted-foreground">{meal.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Data</span>
              </div>
              <p className="text-sm font-medium">{date}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Hora</span>
              </div>
              <p className="text-sm font-medium">{time}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
