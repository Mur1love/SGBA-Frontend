import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Download,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Eye,
} from "lucide-react";
import { GER_SUBMISSOES } from "../../data/mock";
import { T } from "../../components/ui";

const STATUS_PILL: Record<string, { bg: string; fg: string; label: string }> = {
  EM_ANALISE: { bg: "#2158BE26", fg: "#2158BE", label: "Em análise" },
  PENDENTE_DOCUMENTOS: { bg: "#EE992126", fg: "#B9700C", label: "Pendente de documentos" },
  APROVADA: { bg: "#17C96426", fg: "#17C964", label: "Aprovada" },
  INDEFERIDA: { bg: "#EE212E26", fg: "#D31822", label: "Indeferida" },
};

const KPIS = [
  { label: "Recebidas", value: "24", chip: "+3 hoje", bg: "#2158BE26", fg: "#2158BE" },
  { label: "Em análise", value: "9", chip: "prazo 22/03", bg: "#EE992126", fg: "#B9700C" },
  { label: "Aprovadas", value: "11", chip: "+2 esta semana", bg: "#17C96426", fg: "#17C964" },
  { label: "Indeferidas", value: "4", chip: "2 com recurso", bg: "#EE212E26", fg: "#D31822" },
];

function SelectBox({ value, w }: { value: string; w: number }) {
  return (
    <div
      className="flex h-[36px] shrink-0 items-center justify-between rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]"
      style={{ width: w }}
    >
      <select
        defaultValue={value}
        className="h-full w-full appearance-none bg-transparent text-[14px] text-ink outline-none"
      >
        <option>{value}</option>
      </select>
      <ChevronDown size={16} color="#8A93A8" className="pointer-events-none" />
    </div>
  );
}

export default function GerSubmissoes() {
  const nav = useNavigate();
  const [busca, setBusca] = useState("");
  const lista = GER_SUBMISSOES.filter(
    (s) => (s.aluno + s.protocolo).toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      {/* Header */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={24} w="semibold">
            Submissões Recebidas
          </T>
          <T s={14} tone="secondary">
            Avalie os formulários, atualize status e responda os alunos
          </T>
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <button className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
            <Plus size={16} color="#333333" />
          </button>
          <button className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] border border-line bg-transparent px-[16px] py-[8px] hover:bg-soft">
            <Download size={16} color="#333333" />
            <T s={14} w="medium">
              Exportar CSV
            </T>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="flex w-full flex-row items-start gap-[12px]">
        {KPIS.map((k) => (
          <div key={k.label} className="flex h-fit flex-1 flex-col gap-[8px] rounded-[24px] bg-white p-[16px]">
            <T s={12} w="medium" tone="secondary">
              {k.label}
            </T>
            <div className="flex w-full flex-row items-center justify-between">
              <T s={28} w="semibold">
                {k.value}
              </T>
              <div className="flex items-center rounded-[16px] px-[4px] py-[2px]" style={{ background: k.bg }}>
                <div className="text-[11px] font-medium whitespace-nowrap" style={{ color: k.fg }}>
                  {k.chip}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex w-full flex-row items-start gap-[8px]">
        <div className="flex w-[230px] shrink-0 flex-col gap-[4px]">
          <T s={14} w="medium">
            Programa
          </T>
          <SelectBox value="Todos os programas" w={230} />
        </div>
        <div className="flex w-[200px] shrink-0 flex-col gap-[4px]">
          <T s={14} w="medium">
            Status
          </T>
          <SelectBox value="Todos os status" w={200} />
        </div>
        <div className="h-[1px] flex-1" />
        <div className="flex w-[260px] shrink-0 flex-col gap-[4px]">
          <div className="flex h-[36px] w-full items-center rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
            <div className="flex flex-1 items-center gap-[6px]">
              <Search size={16} color="#8A93A8" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por aluno ou protocolo..."
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-[#8A93A8]"
              />
            </div>
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-[12px] bg-soft"
              >
                <X size={16} color="#5F6C85" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex w-full flex-col gap-[2px] rounded-[16px] bg-[#F1F3FA] p-[4px]">
        <div className="flex h-[33px] w-full shrink-0 flex-row items-center gap-[2px]">
          {[
            ["Protocolo", 110, false],
            ["Aluno", 0, true],
            ["Programa", 230, false],
            ["Enviada", 100, false],
            ["Status", 180, false],
            ["Ação", 110, false],
          ].map(([label, w, flex]) => (
            <div
              key={label as string}
              className={`flex h-full items-center px-[16px] py-[10px] ${flex ? "flex-1" : "shrink-0"}`}
              style={flex ? undefined : { width: w as number }}
            >
              <T s={11} w="medium" tone="secondary" className="tracking-[0.5px]">
                {label}
              </T>
            </div>
          ))}
        </div>
        {lista.map((s) => {
          const pill = STATUS_PILL[s.status];
          return (
            <div key={s.id} className="flex h-[56px] w-full shrink-0 flex-row items-center gap-[2px]">
              <div
                className="flex h-full w-[110px] shrink-0 items-center rounded-l-[8px] bg-white px-[16px] py-[12px]"
              >
                <div className="font-mono text-[13px] text-ink-secondary">{s.protocolo}</div>
              </div>
              <div className="flex h-full flex-1 flex-row items-center gap-[10px] bg-white px-[16px] py-[12px]">
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-soft">
                  <T s={11} w="medium">
                    {s.iniciais}
                  </T>
                </div>
                <div className="flex flex-col gap-[1px]">
                  <T s={13} w="medium">
                    {s.aluno}
                  </T>
                  <T s={11} tone="secondary">
                    {s.cursoPeriodo}
                  </T>
                </div>
              </div>
              <div className="flex h-full w-[230px] shrink-0 items-center bg-white px-[16px] py-[12px]">
                <T s={13} tone="secondary">
                  {s.programa}
                </T>
              </div>
              <div className="flex h-full w-[100px] shrink-0 items-center bg-white px-[16px] py-[12px]">
                <T s={13} tone="secondary">
                  {s.dataEnvio}
                </T>
              </div>
              <div className="flex h-full w-[180px] shrink-0 items-center bg-white px-[16px] py-[12px]">
                <div className="flex items-center rounded-[16px] px-[4px] py-[2px]" style={{ background: pill.bg }}>
                  <div className="text-[11px] font-medium whitespace-nowrap" style={{ color: pill.fg }}>
                    {pill.label}
                  </div>
                </div>
              </div>
              <div
                className="flex h-full w-[110px] shrink-0 items-center rounded-r-[8px] bg-white px-[16px] py-[12px]"
              >
                <button
                  onClick={() => nav(`/gerenciador/avaliar/${s.id}`)}
                  className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] px-[12px] py-[8px] hover:bg-soft"
                >
                  {s.avaliavel ? (
                    <ClipboardCheck size={14} color="#333333" />
                  ) : (
                    <Eye size={14} color="#333333" />
                  )}
                  <T s={13} w="medium">
                    {s.avaliavel ? "Avaliar" : "Ver"}
                  </T>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex w-full flex-row items-center justify-between">
        <T s={13} tone="secondary">
          1–{lista.length} de 24 submissões
        </T>
        <div className="flex w-fit flex-row items-center gap-[6px]">
          <button className="flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[24px] px-[10px] py-0 hover:bg-soft">
            <T s={14} w="medium">
              Previous
            </T>
            <ChevronLeft size={16} color="#333333" />
          </button>
          <button className="flex h-[36px] w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-[24px] bg-soft">
            <T s={14} w="medium">
              1
            </T>
          </button>
          <button className="flex h-[36px] w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
            <T s={14} w="medium">
              2
            </T>
          </button>
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center">
            <T s={14} tone="secondary">
              ...
            </T>
          </div>
          <button className="flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[24px] px-[10px] py-0 hover:bg-soft">
            <T s={14} w="medium">
              Próx.
            </T>
            <ChevronRight size={16} color="#333333" />
          </button>
        </div>
      </div>
    </div>
  );
}
