import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Plus, FileText, Eye, CircleAlert, Upload } from "lucide-react";
import { SUBMISSOES, type Submissao } from "../../data/mock";
import { T } from "../../components/ui";

const FILTERS = [
  { key: "todas", label: "Todas", bg: "#EBEDF5", fg: "#333333" },
  { key: "EM_ANALISE", label: "Em análise", bg: "#2158BE26", fg: "#2158BE" },
  { key: "PENDENTE_DOCUMENTOS", label: "Pendentes", bg: "#EE992126", fg: "#B9700C" },
  { key: "APROVADA", label: "Aprovadas", bg: "#17C96426", fg: "#17C964" },
  { key: "INDEFERIDA", label: "Indeferidas", bg: "#EE212E26", fg: "#D31822" },
];

const STATUS_PILL: Record<string, { bg: string; fg: string; label: string }> = {
  EM_ANALISE: { bg: "#2158BE26", fg: "#2158BE", label: "Em análise" },
  PENDENTE_DOCUMENTOS: { bg: "#EE992126", fg: "#B9700C", label: "Pendente de documentos" },
  APROVADA: { bg: "#17C96426", fg: "#17C964", label: "Aprovada" },
  INDEFERIDA: { bg: "#EE212E26", fg: "#D31822", label: "Indeferida" },
};

function TimelineDot({ color }: { color: string }) {
  return (
    <div className="flex w-[16px] shrink-0 flex-col items-center">
      <div
        className="h-[10px] w-[10px] shrink-0 rounded-full"
        style={{ background: color, outline: color === "#E7EBF5" ? "2px solid #E4E7F0" : undefined, outlineOffset: -1 }}
      />
    </div>
  );
}

function DetailPanel({ s }: { s: Submissao }) {
  const pill = STATUS_PILL[s.status];
  return (
    <div className="flex w-full flex-row items-start gap-[16px]">
      <div className="flex h-fit flex-1 flex-col gap-[16px] rounded-[24px] bg-white p-[20px]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <T s={15} w="semibold">
              Andamento — {s.programa} {s.protocolo}
            </T>
            <T s={12} tone="secondary">
              Programa: {s.programa}
              {s.orientador ? ` · Orientador: ${s.orientador}` : ""}
            </T>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center rounded-[16px] px-[4px] py-[2px]" style={{ background: pill.bg }}>
              <div className="text-[11px] font-medium whitespace-nowrap" style={{ color: pill.fg }}>
                {pill.label}
              </div>
            </div>
            {s.status === "PENDENTE_DOCUMENTOS" && (
              <button className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] bg-warning px-[12px] py-[8px] hover:bg-[#D98410]">
                <Upload size={14} color="#18181B" />
                <T s={13} w="medium" tone="dark">
                  Resolver pendência
                </T>
              </button>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          {s.timeline.map((ev) => (
            <div key={ev.titulo} className="flex w-full flex-row items-start gap-[12px]">
              <TimelineDot color={ev.dot ?? "#E7EBF5"} />
              <div className="flex h-fit flex-1 flex-col gap-[4px] pb-[20px]">
                <div className="flex w-fit flex-row items-center gap-[8px]">
                  <T s={13} w="medium">
                    {ev.titulo}
                  </T>
                  <T s={11} tone="secondary">
                    {ev.data}
                  </T>
                </div>
                {ev.obs && <div className="w-full text-[12px]/[17px] text-ink-secondary">{ev.obs}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MinhasSubmissoes() {
  const nav = useNavigate();
  const [filtro, setFiltro] = useState("todas");
  const [busca, setBusca] = useState("");
  const [sel, setSel] = useState(1);

  const minhas = SUBMISSOES.filter((s) => s.aluno === "Ana Souza");
  const counts: Record<string, number> = {
    todas: minhas.length,
    EM_ANALISE: minhas.filter((s) => s.status === "EM_ANALISE").length,
    PENDENTE_DOCUMENTOS: minhas.filter((s) => s.status === "PENDENTE_DOCUMENTOS").length,
    APROVADA: minhas.filter((s) => s.status === "APROVADA").length,
    INDEFERIDA: minhas.filter((s) => s.status === "INDEFERIDA").length,
  };
  const lista = minhas.filter(
    (s) =>
      (filtro === "todas" || s.status === filtro) &&
      (s.programa + s.protocolo).toLowerCase().includes(busca.toLowerCase()),
  );
  const selecionada = minhas.find((s) => s.id === sel) ?? minhas[0];

  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      {/* Header */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={24} w="semibold">
            Minhas Submissões
          </T>
          <T s={14} tone="secondary">
            Acompanhe o andamento das suas candidaturas a bolsas e auxílios
          </T>
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <div className="flex h-[36px] w-[280px] items-center rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
            <div className="flex flex-1 items-center gap-[6px]">
              <Search size={16} color="#8A93A8" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por programa ou protocolo..."
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
          <button
            onClick={() => nav("/aluno/programas")}
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft"
          >
            <Plus size={16} color="#333333" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex w-fit flex-row items-center gap-[8px]">
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFiltro(f.key)} className="cursor-pointer">
            <div
              className="flex w-fit items-center rounded-[16px] px-[8px] py-[2px]"
              style={{ background: filtro === f.key ? f.bg : "#EBEDF5" }}
            >
              <div
                className="text-[12px] font-medium whitespace-nowrap"
                style={{ color: filtro === f.key ? f.fg : "#333333" }}
              >
                {f.label} ({counts[f.key]})
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex w-full flex-col gap-[2px] rounded-[16px] bg-[#F1F3FA] p-[4px]">
        <div className="flex h-[33px] w-full shrink-0 flex-row items-center gap-[2px]">
          <div className="flex h-full flex-1 items-center px-[16px] py-[10px]">
            <T s={11} w="medium" tone="secondary" className="tracking-[0.5px]">
              Programa
            </T>
          </div>
          {[
            ["Protocolo", 120],
            ["Enviada", 100],
            ["Status", 180],
            ["Documentos", 110],
            ["Ação", 180],
          ].map(([label, w]) => (
            <div key={label as string} className="flex h-full shrink-0 items-center px-[16px] py-[10px]" style={{ width: w as number }}>
              <T s={11} w="medium" tone="secondary" className="tracking-[0.5px]">
                {label}
              </T>
            </div>
          ))}
        </div>
        {lista.map((s) => {
          const pill = STATUS_PILL[s.status];
          return (
            <div key={s.id} className="flex h-[58px] w-full shrink-0 flex-row items-center gap-[2px]">
              <button
                onClick={() => setSel(s.id)}
                className="flex h-full flex-1 cursor-pointer flex-col items-start gap-[2px] rounded-l-[8px] bg-white px-[16px] py-[12px] text-left"
              >
                <T s={14} w="medium">
                  {s.programa}
                </T>
                <T s={12} tone="secondary">
                  {s.categoria}
                </T>
              </button>
              <div className="flex h-full w-[120px] shrink-0 items-center bg-white px-[16px] py-[12px]">
                <div className="font-mono text-[13px] text-ink-secondary">{s.protocolo}</div>
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
              <div className="flex h-full w-[110px] shrink-0 items-center gap-[6px] bg-white px-[16px] py-[12px]">
                <FileText size={16} color="#5F6C85" />
                <T s={12} tone="secondary">
                  {s.docs} {s.docs === 1 ? "PDF" : "PDFs"}
                </T>
              </div>
              <div className="flex h-full w-[180px] shrink-0 items-center rounded-r-[8px] bg-white px-[16px] py-[12px]">
                <button
                  onClick={() => setSel(s.id)}
                  className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] px-[12px] py-[8px] hover:bg-soft"
                >
                  {s.status === "PENDENTE_DOCUMENTOS" ? (
                    <CircleAlert size={14} color="#333333" />
                  ) : (
                    <Eye size={14} color="#333333" />
                  )}
                  <T s={13} w="medium">
                    {s.status === "PENDENTE_DOCUMENTOS" ? "Resolver pendência" : "Ver detalhes"}
                  </T>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail */}
      {selecionada && <DetailPanel s={selecionada} />}
    </div>
  );
}
