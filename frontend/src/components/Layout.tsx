import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  ClipboardList,
  FolderOpen,
  User,
  ChevronsUpDown,
  LayoutDashboard,
  FileClock,
  Award,
  FileText,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { T } from "./ui";

const NAV = {
  aluno: [
    { to: "/aluno/programas", label: "Programas de Bolsas", icon: GraduationCap },
    { to: "/aluno/submissoes", label: "Minhas Submissões", icon: ClipboardList },
    { to: "/aluno/guias", label: "Editais & Guias", icon: FolderOpen },
    { to: "/aluno/perfil", label: "Meu Perfil", icon: User },
  ],
  gerenciador: [
    { to: "/gerenciador/painel", label: "Painel", icon: LayoutDashboard },
    { to: "/gerenciador/submissoes", label: "Submissões", icon: FileClock },
    { to: "/gerenciador/programas", label: "Programas", icon: Award },
    { to: "/gerenciador/editais", label: "Editais", icon: FileText },
    { to: "/gerenciador/relatorios", label: "Relatórios", icon: BarChart3 },
    { to: "/gerenciador/perfil", label: "Meu Perfil", icon: User },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();
  if (!user) return null;
  const items = NAV[user.role];

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-canvas">
      <div className="flex h-full w-[240px] shrink-0 flex-col gap-[4px] border-r border-line bg-white p-[24px_16px]">
        <div className="flex h-[36px] w-full shrink-0 flex-row items-center gap-[10px] px-[8px]">
          <GraduationCap size={20} color="#2158BE" />
          <T s={18} w="semibold">
            SGBA
          </T>
        </div>
        <div className="h-[20px] w-full shrink-0" />
        <div className="flex w-full flex-row items-center px-[8px] py-[6px]">
          <T s={12} w="medium" tone="secondary">
            {user.role === "aluno" ? "PRINCIPAL" : "GERENCIAMENTO"}
          </T>
        </div>
        {items.map(({ to, label, icon: Icon }) => {
          const base = "/" + to.split("/").slice(1, 3).join("/");
          const active = pathname === to || pathname.startsWith(base + "/");
          return (
            <button
              key={to}
              onClick={() => nav(to)}
              className={`flex h-[36px] w-full shrink-0 cursor-pointer flex-row items-center gap-[12px] rounded-[16px] px-[8px] py-[6px] text-left transition-colors ${
                active ? "bg-soft" : "hover:bg-soft/60"
              }`}
            >
              <Icon size={16} color="#333333" />
              <T s={14}>{label}</T>
            </button>
          );
        })}
        <div className="flex w-full flex-col items-center px-[4px] py-0">
          <div className="h-[1px] w-full shrink-0 bg-line" />
        </div>
        <div className="w-full flex-1" />
        <div className="flex w-full flex-col items-center px-[4px] py-0">
          <div className="h-[1px] w-full shrink-0 bg-line" />
        </div>
        <button
          onClick={logout}
          className="flex w-full shrink-0 cursor-pointer flex-row items-center gap-[10px] pt-[12px] pr-[8px] pb-[0px] pl-[8px] text-left"
        >
          <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-soft">
            <T s={12} w="medium">
              {user.initials}
            </T>
          </div>
          <div className="flex h-fit flex-1 flex-col gap-[1px]">
            <T s={13} w="medium">
              {user.name}
            </T>
            <T s={12} tone="secondary">
              {user.role === "aluno" ? "Aluno" : "Gerenciador"}
            </T>
          </div>
          <ChevronsUpDown size={16} color="#5F6C85" />
        </button>
      </div>
      <Outlet />
    </div>
  );
}
