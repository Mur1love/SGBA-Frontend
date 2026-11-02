import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Send,
  FileText,
  Activity,
  LifeBuoy,
  Eye,
  LogIn,
} from "lucide-react";
import { useAuth, type Role } from "../context/AuthContext";
import { T } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const enter = () => {
    login(role);
    nav(role === "aluno" ? "/aluno/programas" : "/gerenciador/painel");
  };

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden bg-canvas">
      {/* Branding Panel */}
      <div className="relative flex h-full w-[600px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F1F3FA] via-[#F3F4F9] to-white p-[56px] pb-[44px]">
        <div className="absolute top-[-200px] left-[280px] h-[560px] w-[560px] rounded-full opacity-40 [background-image:radial-gradient(ellipse_50%_50%_at_50%_50%,_#2158BE_0%,_#FFFFFF00_100%)]" />
        <div className="absolute top-[600px] left-[-220px] h-[520px] w-[520px] rounded-full opacity-25 [background-image:radial-gradient(ellipse_50%_50%_at_50%_50%,_#2158BE_0%,_#FFFFFF00_100%)]" />
        <div className="absolute top-[660px] left-[400px] h-[340px] w-[340px] rounded-full outline-[1.5px] outline-[#2158BE33]" />

        <div className="relative z-[3] flex flex-row items-center gap-[12px]">
          <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-accent">
            <GraduationCap size={24} color="#FCFCFC" />
          </div>
          <div className="flex flex-col gap-[2px]">
            <T s={14} w="semibold">
              Universidade de Pernambuco
            </T>
            <T s={12} tone="secondary">
              Pró-Reitoria de Pós-Graduação · PROPG
            </T>
          </div>
        </div>

        <div className="relative z-[4] flex w-full flex-col gap-[24px]">
          <div className="flex h-fit w-fit items-center rounded-[16px] bg-accent-soft px-[8px] py-[2px]">
            <T s={12} w="medium" tone="accent">
              Sistema Oficial de Gestão
            </T>
          </div>
          <T s={76} w="bold" className="tracking-[1px]">
            SGBA
          </T>
          <T s={16} tone="secondary" lh="24px">
            Bolsas e Auxílios · Universidade de Pernambuco
          </T>
          <div className="flex w-full flex-col gap-[18px] pt-[8px]">
            {[
              { icon: Send, text: "Candidate-se a programas de bolsa" },
              { icon: FileText, text: "Preencha e gere o formulário em PDF automaticamente" },
              { icon: Activity, text: "Acompanhe o status das suas submissões" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex w-full flex-row items-start gap-[14px]">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] bg-accent-soft">
                  <Icon size={18} color="#2158BE" />
                </div>
                <div className="flex-1 text-[15px]/[22px] text-ink">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[5] flex flex-row items-center gap-[10px]">
          <div className="h-[2px] w-[28px] shrink-0 rounded-[1px] bg-accent" />
          <T s={12} tone="secondary">
            Acesso com conta institucional UPE
          </T>
        </div>
      </div>

      {/* Login Panel */}
      <div className="flex h-full flex-1 flex-col bg-canvas">
        <div className="flex w-full flex-row items-center justify-end px-[28px] pt-[20px]">
          <button className="flex h-[38px] cursor-pointer items-center gap-[8px] rounded-[24px] px-[16px] py-[8px] hover:bg-soft">
            <LifeBuoy size={16} color="#333333" />
            <T s={14} w="medium">
              Suporte
            </T>
          </button>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center px-[40px] py-[24px]">
          <div className="flex w-[440px] shrink-0 flex-col gap-[18px] rounded-[24px] border border-line bg-white px-[28px] pt-[28px] pb-[24px] shadow-[0px_2px_4px_0px_#0000000A]">
            <div className="flex w-full flex-col gap-[6px]">
              <T s={20} w="semibold">
                Acessar o SGBA
              </T>
              <T s={13} tone="secondary" lh="19px">
                Entre com sua conta institucional para continuar.
              </T>
            </div>

            {/* Profile Tabs */}
            <div className="flex h-[40px] w-full shrink-0 flex-row rounded-[20px] bg-soft p-[4px]">
              {(["aluno", "gerenciador"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex h-[32px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[24px] px-[16px] transition-colors ${
                    role === r ? "bg-white shadow-[0px_1px_3px_0px_#0000000A]" : ""
                  }`}
                >
                  <T s={14} w="medium" tone={role === r ? "ink" : "secondary"}>
                    {r === "aluno" ? "Aluno" : "Gerenciador"}
                  </T>
                </button>
              ))}
            </div>

            <div className="flex w-full flex-col gap-[12px]">
              <div className="flex w-full flex-col gap-[4px]">
                <T s={14} w="medium">
                  E-mail institucional
                </T>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome.sobrenome@upe.br"
                  className="h-[40px] w-full rounded-[12px] bg-white px-[12px] text-[14px] text-ink shadow-[0px_1px_2px_0px_#0000000F] outline-none placeholder:text-[#8A93A8] focus:ring-2 focus:ring-accent/40"
                />
                <div className="px-[4px]">
                  <T s={12} tone="secondary">
                    Use seu endereço institucional @upe.br
                  </T>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[4px]">
                <T s={14} w="medium">
                  Senha
                </T>
                <div className="flex h-[40px] w-full items-center justify-between rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000A] focus-within:ring-2 focus-within:ring-accent/40">
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    className="h-full flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-[#8A93A8]"
                  />
                  <Eye size={18} color="#8A93A8" />
                </div>
                <div className="px-[4px]">
                  <T s={12} tone="secondary">
                    Mínimo de 8 caracteres.
                  </T>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row items-center justify-between">
              <label className="flex cursor-pointer flex-row items-center gap-[8px]">
                <input type="checkbox" className="h-[16px] w-[16px] rounded-[6px] border border-line accent-[#2158BE]" />
                <T s={14} w="medium">
                  Lembrar-me
                </T>
              </label>
              <button className="cursor-pointer">
                <T s={14} w="medium" tone="accent">
                  Esqueci minha senha
                </T>
              </button>
            </div>

            <button
              onClick={enter}
              className="flex h-[44px] w-full shrink-0 cursor-pointer flex-row items-center justify-center gap-[8px] rounded-[24px] bg-accent transition-colors hover:bg-accent-hover"
            >
              <LogIn size={18} color="#FCFCFC" />
              <T s={15} w="medium" tone="inverse">
                Entrar
              </T>
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-center pb-[26px]">
          <T s={12} tone="tertiary">
            © 2025 UPE · PROPG
          </T>
        </div>
      </div>
    </div>
  );
}
