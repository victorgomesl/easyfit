"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import DialogAddMeal from "./dialog-add-meal"
import DialogEditMeal from "./dialog-edit-meal"
import DialogViewMeal from "./dialog-view-meal"
import DialogDeleteMeal from "./dialog-delete-meal"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import ExportButton from "@/components/dashboard/export-button"

interface Meal {
  id: string
  name: string
  description?: string
  calories: number
  dateTime: string
  type: "Café da manhã" | "Almoço" | "Lanche da tarde" | "Janta"
}

interface ColumnVisibility {
  name: boolean
  description: boolean
  calories: boolean
  dateTime: boolean
  type: boolean
}

export default function TableListMeal() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [addMealOpen, setAddMealOpen] = useState(false)
  const [editMealOpen, setEditMealOpen] = useState(false)
  const [viewMealOpen, setViewMealOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    name: true,
    description: true,
    calories: true,
    dateTime: true,
    type: true,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  async function fetchMeals() {
    setLoading(true)
    try {
      const res = await fetch("/api/meals")
      if (!res.ok) {
        throw new Error("Erro ao buscar refeições")
      }
      const data = await res.json()

      const sortedData = [...data].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
      setMeals(sortedData)
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar refeições")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  function refreshMeals() {
    fetchMeals()
  }

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
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${day}/${month} ${hours}:${minutes}`
    } catch (e) {
      return dateTimeStr
    }
  }

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      meal.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || meal.type === typeFilter
    return matchesSearch && matchesType
  })

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMeals = filteredMeals.slice(startIndex, endIndex)

  const generatePaginationLinks = () => {
    const links = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      links.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (currentPage > 3) {
        links.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      for (let i = startPage; i <= endPage; i++) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} onClick={() => setCurrentPage(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
      if (currentPage < totalPages - 2) {
        links.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      if (totalPages > 1) {
        links.push(
          <PaginationItem key={totalPages}>
            <PaginationLink isActive={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }
    return links
  }

  const handleViewMeal = (meal: Meal) => {
    setSelectedMeal(meal)
    setViewMealOpen(true)
  }

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal)
    setEditMealOpen(true)
  }

  const handleDeleteMeal = (meal: Meal) => {
    setSelectedMeal(meal)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <CardHeader className="px-6 pt-6 pb-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Refeições</CardTitle>
              <CardDescription className="mt-1.5">Gerencie suas refeições e controle suas calorias</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <ExportButton meals={meals} formatDateTime={formatDateTime} />
              <Button onClick={() => setAddMealOpen(true)} className="gap-1.5">
                <Plus className="h-4 w-4" />
                <span>Nova Refeição</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar refeições..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filtrar por tipo" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Café da manhã">Café da manhã</SelectItem>
                  <SelectItem value="Almoço">Almoço</SelectItem>
                  <SelectItem value="Lanche da tarde">Lanche da tarde</SelectItem>
                  <SelectItem value="Janta">Janta</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Colunas visíveis</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium" disabled>
                    Colunas visíveis
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={columnVisibility.name}
                    onCheckedChange={(checked) => setColumnVisibility({ ...columnVisibility, name: checked })}
                  >
                    Nome
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={columnVisibility.description}
                    onCheckedChange={(checked) => setColumnVisibility({ ...columnVisibility, description: checked })}
                  >
                    Descrição
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={columnVisibility.calories}
                    onCheckedChange={(checked) => setColumnVisibility({ ...columnVisibility, calories: checked })}
                  >
                    Calorias
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={columnVisibility.dateTime}
                    onCheckedChange={(checked) => setColumnVisibility({ ...columnVisibility, dateTime: checked })}
                  >
                    Data/Hora
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={columnVisibility.type}
                    onCheckedChange={(checked) => setColumnVisibility({ ...columnVisibility, type: checked })}
                  >
                    Tipo
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columnVisibility.name && <TableHead className="px-4 py-3">Nome</TableHead>}
                {columnVisibility.description && (
                  <TableHead className="hidden md:table-cell px-4 py-3">Descrição</TableHead>
                )}
                {columnVisibility.calories && <TableHead className="px-4 py-3">Calorias</TableHead>}
                {columnVisibility.dateTime && <TableHead className="px-4 py-3">Data/Hora</TableHead>}
                {columnVisibility.type && <TableHead className="px-4 py-3">Tipo</TableHead>}
                <TableHead className="w-[100px] text-right px-4 py-3">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {columnVisibility.name && (
                      <TableCell className="px-4 py-3">
                        <Skeleton className="h-5 w-[200px]" />
                      </TableCell>
                    )}
                    {columnVisibility.description && (
                      <TableCell className="hidden md:table-cell px-4 py-3">
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    )}
                    {columnVisibility.calories && (
                      <TableCell className="px-4 py-3">
                        <Skeleton className="h-5 w-[60px]" />
                      </TableCell>
                    )}
                    {columnVisibility.dateTime && (
                      <TableCell className="px-4 py-3">
                        <Skeleton className="h-5 w-[120px]" />
                      </TableCell>
                    )}
                    {columnVisibility.type && (
                      <TableCell className="px-4 py-3">
                        <Skeleton className="h-5 w-[100px]" />
                      </TableCell>
                    )}
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : currentMeals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={Object.values(columnVisibility).filter(Boolean).length + 1}
                    className="h-24 text-center px-4 py-3"
                  >
                    Nenhuma refeição encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                currentMeals.map((meal) => (
                  <TableRow key={meal.id}>
                    {columnVisibility.name && (
                      <TableCell className="font-medium px-4 py-3">
                        {meal.name}
                      </TableCell>
                    )}
                    {columnVisibility.description && (
                      <TableCell className="hidden md:table-cell px-4 py-3">
                        {meal.description || "-"}
                      </TableCell>
                    )}
                    {columnVisibility.calories && (
                      <TableCell className="px-4 py-3">
                        {meal.calories.toLocaleString()} kcal
                      </TableCell>
                    )}
                    {columnVisibility.dateTime && (
                      <TableCell className="px-4 py-3">
                        {formatDateTime(meal.dateTime)}
                      </TableCell>
                    )}
                    {columnVisibility.type && (
                      <TableCell className="px-4 py-3">
                        <Badge variant="outline" className={cn(getMealTypeBadgeColor(meal.type))}>
                          {meal.type}
                        </Badge>
                      </TableCell>
                    )}
                    <TableCell className="text-right px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center" onClick={() => handleViewMeal(meal)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Visualizar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center" onClick={() => handleEditMeal(meal)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="flex items-center text-destructive focus:text-destructive"
                            onClick={() => handleDeleteMeal(meal)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {currentMeals.length > 0 ? startIndex + 1 : 0} a{" "}
          {Math.min(endIndex, filteredMeals.length)} de {filteredMeals.length} refeições
        </div>
        {totalPages > 1 && (
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationPrevious
                onClick={currentPage === 1 ? undefined : () => setCurrentPage(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1 ? "true" : undefined}
                className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
              >
                Anterior
              </PaginationPrevious>
              {generatePaginationLinks()}
              <PaginationNext
                onClick={currentPage === totalPages ? undefined : () => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages ? "true" : undefined}
                className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
              >
                Próximo
              </PaginationNext>
            </PaginationContent>
          </Pagination>
        )}
      </CardFooter>
      <DialogAddMeal open={addMealOpen} onOpenChange={setAddMealOpen} onMealAdded={refreshMeals} />
      {selectedMeal && (
        <>
          <DialogEditMeal
            open={editMealOpen}
            onOpenChange={setEditMealOpen}
            meal={selectedMeal}
            onMealUpdated={refreshMeals}
          />
          <DialogViewMeal open={viewMealOpen} onOpenChange={setViewMealOpen} meal={selectedMeal} />
          <DialogDeleteMeal
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            mealId={selectedMeal.id}
            mealName={selectedMeal.name}
            onMealDeleted={refreshMeals}
          />
        </>
      )}
    </>
  )
}
