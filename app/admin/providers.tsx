"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { dataProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/nextjs-router";
import { createBrowserClient } from "@supabase/ssr";
import { getAuthProvider } from "./_lib/authProvider";
import { NotificationProvider } from "@refinedev/core";
import { toast } from "sonner";

const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Notification provider usando sonner
const notificationProvider: NotificationProvider = {
  open: ({ message, key, type }) => {
    if (type === "success") {
      toast.success(message, { id: key });
    } else if (type === "error") {
      toast.error(message, { id: key });
    } else {
      toast.info(message, { id: key });
    }
  },
  close: (key) => {
    toast.dismiss(key);
  },
};

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <RefineKbarProvider>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        authProvider={getAuthProvider()}
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "posts",
            list: "/admin/posts-refine",
            create: "/admin/posts-refine/create",
            edit: "/admin/posts-refine/edit/:id",
            show: "/admin/posts-refine/show/:id",
            meta: {
              canDelete: true,
              label: "Posts (Refine)",
              icon: "📝",
            },
          },
          {
            name: "categories",
            list: "/admin/categories",
            create: "/admin/categories/create",
            edit: "/admin/categories/edit/:id",
            meta: {
              canDelete: true,
              label: "Categorias",
              icon: "📁",
            },
          },
          {
            name: "tags",
            list: "/admin/tags",
            create: "/admin/tags/create",
            edit: "/admin/tags/edit/:id",
            meta: {
              canDelete: true,
              label: "Tags",
              icon: "🏷️",
            },
          },
          {
            name: "anonymous_comments",
            list: "/admin/comments",
            show: "/admin/comments/show/:id",
            meta: {
              canDelete: true,
              label: "Comentários",
              icon: "💬",
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: "floriplanta-admin",
        }}
      >
        <RefineKbar />
        {children}
      </Refine>
    </RefineKbarProvider>
  );
}