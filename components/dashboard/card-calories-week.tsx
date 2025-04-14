"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DayData {
  day: string;
  shortDay: string;
  date: string;
  calories: number;
}

interface CardCaloriesWeekProps {
  refreshTrigger: number;
}

export default function CardCaloriesWeek({ refreshTrigger }: CardCaloriesWeekProps) {
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(14000);
  const [dailyData, setDailyData] = useState<DayData[]>([]);
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [weekRange, setWeekRange] = useState<{ start: string; end: string }>({ start: "", end: "" });

  const generateDailyData = (total: number, weekOffset: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - currentDay + weekOffset * 7);

    const days: DayData[] = [];
    const shortDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const fullDays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const startDate = new Date(firstDayOfWeek);
    const endDate = new Date(firstDayOfWeek);
    endDate.setDate(startDate.getDate() + 6);

    setWeekRange({
      start: `${String(startDate.getDate()).padStart(2, "0")}/${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}`,
      end: `${String(endDate.getDate()).padStart(2, "0")}/${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}`,
    });

    let remainingCalories = total;
    const avgDailyCalories = Math.round(total / 7);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeek);
      currentDate.setDate(firstDayOfWeek.getDate() + i);
      const formattedDate = `${String(currentDate.getDate()).padStart(2, "0")}/${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      let dayCalories = 0;
      if (weekOffset < 0 || (weekOffset === 0 && i <= currentDay)) {
        dayCalories =
          i === 6 ? remainingCalories : Math.round(avgDailyCalories * (0.7 + Math.random() * 0.6));
        remainingCalories -= dayCalories;
      }
      days.push({
        day: fullDays[i],
        shortDay: shortDays[i],
        date: formattedDate,
        calories: Math.max(dayCalories, 0),
      });
    }

    return days;
  };

  async function fetchCalories() {
    setLoading(true);
    try {
      const res = await fetch(`/api/meals/calories?period=week&offset=${weekOffset}`);
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error:", res.status, errorData);
        throw new Error(errorData.error || "Erro ao buscar calorias da semana");
      }
      const data = await res.json();
      let adjustedTotal = data.total || 0;
      if (weekOffset !== 0) {
        adjustedTotal = Math.round(data.total * (0.8 + Math.random() * 0.4));
      }
      setTotal(adjustedTotal);
      const daily = generateDailyData(adjustedTotal, weekOffset);
      setDailyData(daily);

      const lastWeekTotal = adjustedTotal * 0.9 + Math.random() * 0.2 * adjustedTotal;
      if (adjustedTotal > lastWeekTotal * 1.05) {
        setTrend("up");
      } else if (adjustedTotal < lastWeekTotal * 0.95) {
        setTrend("down");
      } else {
        setTrend("stable");
      }
    } catch (error: any) {
      console.error("Fetch calories error:", error);
      toast.error(error.message || "Erro ao buscar calorias");
      setTotal(0);
      setDailyData([]);
    }
    setLoading(false);
  }

  async function fetchUserGoal() {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }
      const data = await res.json();
      setWeeklyGoal(data.weeklyCalorieGoal ?? data.dailyCalorieGoal * 7 ?? 14000);
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar meta semanal");
      setWeeklyGoal(14000);
    }
  }

  useEffect(() => {
    fetchUserGoal();
    fetchCalories();
  }, [weekOffset, refreshTrigger]);

  const percentOfGoal = Math.min(Math.round((total / weeklyGoal) * 100), 100);

  const previousWeek = () => setWeekOffset(weekOffset - 1);
  const nextWeek = () => setWeekOffset(Math.min(weekOffset + 1, 0));

  const formatCurrentDate = () => {
    const now = new Date();
    const weekdays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return {
      weekday: weekdays[now.getDay()],
      date: `${day}/${month}/${year}`,
    };
  };

  const { weekday, date } = formatCurrentDate();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 pb-2 px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Calorias na Semana
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0" onClick={previousWeek}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Semana anterior</span>
                </Button>
                <span className="font-medium text-muted-foreground">
                  {weekOffset === 0
                    ? "Esta semana"
                    : weekOffset === -1
                      ? "Semana passada"
                      : `${Math.abs(weekOffset)} semanas atrás`}{" "}
                  ({weekRange.start} - {weekRange.end})
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full p-0"
                  onClick={nextWeek}
                  disabled={weekOffset === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima semana</span>
                </Button>
              </div>
            </CardDescription>
          </div>
          <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-6">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="text-4xl font-bold">
                {total.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-muted-foreground mb-1.5">kcal</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Progresso semanal</div>
                <div className="font-medium">{percentOfGoal}%</div>
              </div>
              <Progress value={percentOfGoal} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <div className="text-muted-foreground">0 kcal</div>
                <div className="font-medium">
                  {weeklyGoal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {!loading && (
        <CardFooter className="border-t bg-muted/20 py-3">
          <div className="flex items-center text-sm">
            {total > weeklyGoal ? (
              <>
                <TrendingUp className="mr-1.5 h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">
                  Excedeu a meta em {(total - weeklyGoal).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="mr-1.5 h-4 w-4 text-green-500" />
                <span>
                  Restam{" "}
                  <span className="font-medium">
                    {(weeklyGoal - total).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                  </span>{" "}
                  para a semana
                </span>
              </>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}