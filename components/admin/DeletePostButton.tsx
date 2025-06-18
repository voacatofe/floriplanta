"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePostAction } from "@/app/admin/posts/actions";
import { toast } from "sonner";

interface DeletePostButtonProps {
  postId: number;
  postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deletePostAction(postId);
        
        if (result?.error) {
          toast.error("Erro ao excluir post", {
            description: result.error,
          });
        } else {
          toast.success("Post excluído com sucesso!", {
            description: `"${postTitle}" foi removido permanentemente.`,
          });
          setOpen(false);
        }
      } catch (error) {
        console.error("Erro inesperado ao excluir post:", error);
        toast.error("Erro inesperado", {
          description: "Ocorreu um erro inesperado ao excluir o post. Tente novamente.",
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          title="Excluir Post" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a excluir permanentemente o post <strong>"{postTitle}"</strong>.
            <br />
            <br />
            Esta ação não pode ser desfeita. O post, seus comentários e todas as associações serão removidos permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir Permanentemente"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 