import { AuthBindings } from "@refinedev/core";
import { createBrowserClient } from "@supabase/ssr";

export const getAuthProvider = (): AuthBindings => {
  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: error.message,
          },
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/admin",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Login failed",
        },
      };
    },

    logout: async () => {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        return {
          success: false,
          error: {
            name: "LogoutError",
            message: error.message,
          },
        };
      }

      return {
        success: true,
        redirectTo: "/admin/login",
      };
    },

    check: async () => {
      const { data } = await supabaseClient.auth.getSession();

      if (data?.session) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          name: "Unauthorized",
          message: "Not authenticated",
        },
        logout: true,
        redirectTo: "/admin/login",
      };
    },

    getPermissions: async () => {
      const { data } = await supabaseClient.auth.getUser();

      if (data?.user) {
        // Por enquanto, retornamos admin para todos os usuários autenticados
        // Você pode buscar as permissões reais do banco de dados aqui
        return "admin";
      }

      return null;
    },

    getIdentity: async () => {
      const { data } = await supabaseClient.auth.getUser();

      if (data?.user) {
        return {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email,
          email: data.user.email,
          avatar: data.user.user_metadata?.avatar_url,
        };
      }

      return null;
    },

    onError: async (error) => {
      console.error(error);
      return { error };
    },
  };

  return authProvider;
};