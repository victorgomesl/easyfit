"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Calendar, Flame, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CardCaloriesDay() {
  const [total, setTotal] = useState<number>(0);
  const [goal, setGoal] = useState<number>(2000);
  const [loading, setLoading] = useState<boolean>(false);
  const [goalLoading, setGoalLoading] = useState<boolean>(false);
  const [percentOfGoal, setPercentOfGoal] = useState<number>(0);

  async function fetchCalories() {
    setLoading(true);
    try {
      const res = await fetch("/api/meals/calories?period=day");
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error:", res.status, errorData);
        throw new Error(errorData.error || "Erro ao buscar calorias do dia");
      }
      const data = await res.json();
      setTotal(data.total || 0);
    } catch (error: any) {
      console.error("Fetch calories error:", error);
      toast.error(error.message || "Erro ao buscar calorias");
      setTotal(0);
    }
    setLoading(false);
  }

  async function fetchUserGoal() {
    setGoalLoading(true);
    try {
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }
      const data = await res.json();
      setGoal(data.dailyCalorieGoal ?? 2000);
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar meta diária");
      setGoal(2000);
    }
    setGoalLoading(false);
  }

  useEffect(() => {
    setPercentOfGoal(Math.min(Math.round((total / goal) * 100), 100));
  }, [total, goal]);

  useEffect(() => {
    fetchUserGoal();
    fetchCalories();
  }, []);

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
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 pb-2 px-6 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Calorias Hoje
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                {weekday}, {date}
              </span>
            </CardDescription>
          </div>
          <div className="rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
            <Flame className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-6">
        {(loading || goalLoading) ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-4 w-full" />
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
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">Progresso diário</div>
                <div className="font-medium">{percentOfGoal}%</div>
              </div>
              <Progress value={percentOfGoal} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <div className="text-muted-foreground">0 kcal</div>
                <div className="font-medium">
                  {goal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {!(loading || goalLoading) && (
        <CardFooter className="border-t bg-muted/20 py-3 px-6">
          <div className="flex items-center text-sm">
            <TrendingUp className="mr-1.5 h-4 w-4 text-green-500" />
            <span>
              {total > goal ? (
                <span className="text-red-500 font-medium">
                  Excedeu a meta em {goal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                </span>
              ) : (
                <span>
                  Restam{" "}
                  <span className="font-medium">
                    {(goal - total).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} kcal
                  </span>{" "}
                  para hoje
                </span>
              )}
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
