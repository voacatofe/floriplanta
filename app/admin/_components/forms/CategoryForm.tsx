"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSuccess?: () => void;
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  // Auto-gerar slug baseado no nome
  const name = watch("name");
  useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug);
    }
  }, [name, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const response = await fetch("/admin/categories/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao criar categoria");
      }

      toast.success("Categoria criada com sucesso!");
      reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar categoria");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name")}
          placeholder="Ex: Cannabis Medicinal" />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")} placeholder="cannabis-medicinal" />
        {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input id="description" {...register("description")} placeholder="Breve descrição" />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Criar Categoria"}
      </Button>
    </form>
  );
}