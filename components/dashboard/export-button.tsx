"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Meal {
  id: string;
  name: string;
  description?: string;
  calories: number;
  dateTime: string;
  type: "Café da manhã" | "Almoço" | "Lanche da tarde" | "Janta";
}

interface ExportButtonProps {
  meals: Meal[];
  formatDateTime: (dateTimeStr: string) => string;
}

export default function ExportButton({ meals, formatDateTime }: ExportButtonProps) {
  const handleExport = () => {
    if (!meals || meals.length === 0) {
      toast.error("Nenhuma refeição para exportar.");
      return;
    }

    const doc = new jsPDF("p", "pt");
    doc.text("Refeições - EasyFit", 40, 50);

    const tableColumn = ["Data/Hora", "Nome", "Descrição", "Calorias", "Tipo"];
    const tableRows = meals.map(meal => [
      formatDateTime(meal.dateTime),
      meal.name,
      meal.description || "-",
      `${meal.calories} kcal`,
      meal.type,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 70,
      theme: "grid",
    });

    doc.save("refeicoes.pdf");
    toast.success("PDF exportado com sucesso!");
  };

  return (
    <Button variant="outline" onClick={handleExport} className="gap-1.5">
      <Download className="h-4 w-4" />
      <span>Exportar Dados</span>
    </Button>
  );
}
