"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";

type FormData = z.infer<typeof userAuthSchema>;

interface UserAuthFormProps {
  type?: "login" | "register";
}

export default function UserAuthForm({ type = "login" }: UserAuthFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const result = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: "/dashboard"
    });

    setIsLoading(false);

    if (result?.error) {
      toast.error("Erro ao enviar o link de verificação.", { duration: 5000 });
      return;
    }
    toast.success("Link de verificação enviado! Verifique seu email.", { duration: 5000 });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-1">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input
          id="email"
          placeholder="email@easyfit.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && (
          <p className="px-1 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={cn(buttonVariants(), "w-full")}
      >
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {type === "register" ? "Cadastrar" : "Enviar Link de Acesso"}
      </button>
    </form>
  );
}
