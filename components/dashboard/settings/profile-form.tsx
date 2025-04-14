"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome não pode exceder 50 caracteres"),
  dailyCalorieGoal: z.coerce
    .number()
    .min(500, "A meta deve ser pelo menos 500 calorias")
    .max(10000, "A meta não pode exceder 10.000 calorias"),
  weeklyCalorieGoal: z.coerce
    .number()
    .min(3500, "A meta semanal deve ser pelo menos 3500 calorias")
    .max(70000, "A meta semanal não pode exceder 70.000 calorias"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      dailyCalorieGoal: 2000,
      weeklyCalorieGoal: 14000,
    },
  });

  useEffect(() => {
    async function fetchUser() {
      setIsFetching(true);
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          form.reset({
            name: data.name || "",
            dailyCalorieGoal: data.dailyCalorieGoal || 2000,
            weeklyCalorieGoal: data.weeklyCalorieGoal || 14000,
          });
        } else {
          toast.error("Falha ao obter dados do usuário", { duration: 5000 });
        }
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        toast.error("Erro ao carregar dados do perfil", { duration: 5000 });
      } finally {
        setIsFetching(false);
      }
    }
    fetchUser();
  }, [form]);

  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }
      toast.success("Perfil atualizado com sucesso!", { duration: 5000 });
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar perfil", { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  }

  const userInitials = form.watch("name")
    ? form
        .watch("name")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Informações do Perfil</CardTitle>
        </div>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isFetching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                <Avatar className="h-20 w-20 text-2xl">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este é o nome que será exibido em seu perfil.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dailyCalorieGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta diária de calorias</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 2000"
                            {...field}
                            min={500}
                            max={10000}
                          />
                        </FormControl>
                        <FormDescription>
                          Digite a quantidade de calorias que você pretende consumir diariamente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weeklyCalorieGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta semanal de calorias</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 14000"
                            {...field}
                            min={3500}
                            max={70000}
                          />
                        </FormControl>
                        <FormDescription>
                          Digite a quantidade de calorias que você pretende consumir semanalmente.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/20 py-4">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading || isFetching || !form.formState.isDirty}
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </CardFooter>
    </Card>
  );
}
