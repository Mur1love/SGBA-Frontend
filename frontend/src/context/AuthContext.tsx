import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "aluno" | "gerenciador";

export interface User {
  name: string;
  role: Role;
  email: string;
  initials: string;
}

interface AuthCtx {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({ user: null, login: () => {}, logout: () => {} });

const USERS: Record<Role, User> = {
  aluno: {
    name: "Ana Souza",
    role: "aluno",
    email: "ana.souza@upe.br",
    initials: "AS",
  },
  gerenciador: {
    name: "Carlos Lima",
    role: "gerenciador",
    email: "carlos.lima@upe.br",
    initials: "CL",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <Ctx.Provider
      value={{
        user,
        login: (role) => setUser(USERS[role]),
        logout: () => setUser(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx);
}
