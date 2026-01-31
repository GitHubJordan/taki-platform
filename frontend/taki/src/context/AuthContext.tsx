// src/context/AuthContext.tsx
import React, { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/client";

type User = {
  user_id: string;
  nome?: string | null;
  email?: string | null;
  nivel?: string | null;
  tipo?: string | null;
  taki_coins?: number;
  total_viagens?: number;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (payload: {
    telefone?: string;
    email: string;
    password: string;
    confirm?: string;
    tipo?: string;
    nome?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  restore: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restore();
  }, []);

  // Recupera sessão (token) e carrega perfil
  const restore = async () => {
    console.log("[Auth] restore start");
    setLoading(true);

    let completed = false;
    const timeout = setTimeout(() => {
      if (!completed) {
        console.warn("[Auth] restore timeout (7s) — fallback to login");
        setLoading(false);
      }
    }, 7000);

    try {
      const token = await AsyncStorage.getItem("@taki_access_token");
      console.log("[Auth] token found?", !!token);

      if (token) {
        // aplica header para chamadas seguintes
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const resp = await api.get("/auth/me");
          console.log("[Auth] /auth/me success", resp.data);
          // normalizar user object
          const me = resp.data || {};
          const userObj: User = {
            user_id: String(me.id ?? me.user_id ?? me.email ?? "unknown"),
            nome: me.nome ?? me.name ?? null,
            email: me.email ?? null,
            nivel: me.nivel ?? null,
            tipo: me.tipo ?? null,
            taki_coins: typeof me.taki_coins === "number" ? me.taki_coins : 0,
            total_viagens: typeof me.total_viagens === "number" ? me.total_viagens : 0,
          };
          setUser(userObj);
        } catch (err: any) {
          console.error("[Auth] /auth/me failed — removing token", err?.response?.data || err.message || err);
          await AsyncStorage.removeItem("@taki_access_token");
          delete api.defaults.headers.common["Authorization"];
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("[Auth] restore exception:", err);
      setUser(null);
    } finally {
      completed = true;
      clearTimeout(timeout);
      setLoading(false);
      console.log("[Auth] restore finish — loading=false");
    }
  };

  // Login: aceita formatos { access_token, user_id } ou { token }
  const signIn = async (email: string, password: string) => {
    console.log("[Auth] signIn start");
    setLoading(true);

    try {
      const resp = await api.post("/auth/login", { email, password });
      console.log("[Auth] /auth/login response:", resp.data);

      // o backend pode devolver `access_token` ou `token`
      const token: string | undefined = resp.data?.access_token ?? resp.data?.token ?? undefined;

      if (!token) {
        console.error("[Auth] Missing token in /auth/login response:", resp.data);
        throw new Error("Resposta do servidor inválida: token não encontrado.");
      }

      // grava somente token definido (string)
      await AsyncStorage.setItem("@taki_access_token", String(token));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // buscar perfil do usuário a partir do token
      try {
        const meResp = await api.get("/auth/me");
        const me = meResp.data || {};
        const userObj: User = {
          user_id: String(me.id ?? me.user_id ?? me.email ?? "unknown"),
          nome: me.nome ?? me.name ?? null,
          email: me.email ?? null,
          nivel: me.nivel ?? null,
          tipo: me.tipo ?? null,
          taki_coins: typeof me.taki_coins === "number" ? me.taki_coins : 0,
          total_viagens: typeof me.total_viagens === "number" ? me.total_viagens : 0,
        };
        setUser(userObj);
        console.log("[Auth] signIn success — user loaded");
      } catch (meErr: any) {
        console.warn("[Auth] signIn: /auth/me failed after login — proceeding with minimal user info", meErr?.response?.data || meErr?.message || meErr);
        // fallback minimal user
        setUser({ user_id: "unknown", email });
      }
    } catch (err: any) {
      // tratar erro de rede, timeout, ou resposta do servidor
      let message = "Erro ao iniciar sessão";
      if (err?.message === "Network Error") {
        message = "Erro de rede: verifique a sua conexão ou servidor.";
      } else if (err?.code === "ECONNABORTED") {
        message = "Tempo de conexão esgotado. Tente novamente.";
      } else if (err?.response?.data?.msg) {
        message = err.response.data.msg;
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.message) {
        message = err.message;
      }

      console.error("[Auth] signIn error:", err?.response?.data || err?.message || err);
      // remove qualquer token inválido que possa ter sido gravado por engano
      try {
        const stored = await AsyncStorage.getItem("@taki_access_token");
        if (!stored) {
          // nada a remover
        } 
      } catch (e) {
        console.warn("[Auth] signIn cleanup read error", e);
      }
      throw new Error(message);
    } finally {
      setLoading(false);
      console.log("[Auth] signIn finish");
    }
  };

  // Registro
  const register = async (payload: any) => {
    console.log("[Auth] register start");
    setLoading(true);
    try {
      const resp = await api.post("/auth/register", payload);
      console.log("[Auth] register success", resp.data);
    } catch (err: any) {
      let message = "Erro ao registar utilizador";
      if (err?.response?.data?.msg) message = err.response.data.msg;
      else if (err?.response?.data?.message) message = err.response.data.message;
      else if (err?.message) message = err.message;

      console.error("[Auth] register error:", err?.response?.data || err?.message || err);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const signOut = async () => {
    console.log("[Auth] signOut");
    try {
      await AsyncStorage.removeItem("@taki_access_token");
    } catch (err) {
      console.warn("[Auth] signOut remove token error", err);
    }
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      register,
      signOut,
      restore,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
