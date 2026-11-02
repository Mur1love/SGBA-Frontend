import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Printer,
  Eye,
  Download,
  Check,
  Save,
  Send,
} from "lucide-react";
import { GER_SUBMISSOES } from "../../data/mock";
import { T } from "../../components/ui";

const STATUS_PILL: Record<string, { bg: string; fg: string; label: string }> = {
  EM_ANALISE: { bg: "#2158BE26", fg: "#2158BE", label: "Em análise" },
  PENDENTE_DOCUMENTOS: { bg: "#EE992126", fg: "#B9700C", label: "Pendente de documentos" },
  APROVADA: { bg: "#17C96426", fg: "#17C964", label: "Aprovada" },
  INDEFERIDA: { bg: "#EE212E26", fg: "#D31822", label: "Indeferida" },
};

const CRITERIOS = [
  "CRA ≥ 7,0 exigido pelo edital — atendido (8,2)",
  "Documentação pessoal completa",
  "Projeto aderente à linha do edital",
  "Parecer do orientador registrado no sistema",
];

export default function Avaliar() {
  const nav = useNavigate();
  const { id } = useParams();
  const sub = GER_SUBMISSOES.find((s) => s.id === Number(id)) ?? GER_SUBMISSOES[0];
  const d = sub.detalhe;
  const [status, setStatus] = useState(sub.status);
  const [parecer, setParecer] = useState("");
  const [criterios, setCriterios] = useState<boolean[]>([true, true, true, false]);
  const pill = STATUS_PILL[status];

  const exigeParecer = status === "PENDENTE_DOCUMENTOS" || status === "INDEFERIDA";

  return (
    <div className="flex h-full flex-1 flex-col gap-[16px] overflow-y-auto p-[24px_40px]">
      <button
        onClick={() => nav("/gerenciador/submissoes")}
        className="flex h-[32px] w-fit cursor-pointer items-center gap-[5px] rounded-[24px] px-[12px] py-[8px] hover:bg-soft"
      >
        <ArrowLeft size={14} color="#333333" />
        <T s={13} w="medium">
          Voltar para Submissões
        </T>
      </button>

      {/* Header */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={24} w="semibold">
            Avaliar Submissão {sub.protocolo}
          </T>
          <T s={14} tone="secondary">
            {sub.programa} · {sub.aluno} · enviada em {sub.dataEnvio}
          </T>
        </div>
        <div className="flex items-center rounded-[16px] px-[4px] py-[2px]" style={{ background: pill.bg }}>
          <div className="text-[11px] font-medium whitespace-nowrap" style={{ color: pill.fg }}>
            {pill.label}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-row items-start gap-[16px]">
        {/* Left column */}
        <div className="flex h-fit flex-1 flex-col gap-[16px]">
          {/* Ficha do aluno */}
          <div className="flex w-full flex-col gap-[16px] rounded-[24px] bg-white p-[20px]">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-[12px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-soft">
                  <T s={14} w="medium">
                    {sub.iniciais}
                  </T>
                </div>
                <div className="flex flex-col gap-[1px]">
                  <T s={15} w="semibold">
                    {sub.aluno}
                  </T>
                  <T s={12} tone="secondary">
                    {d ? `Eng. Computação · ${d.periodo} período · Matrícula 2210457` : sub.cursoPeriodo}
                  </T>
                </div>
              </div>
              {d && <T s={13} tone="secondary">{d.email}</T>}
            </div>
            {d && (
              <div className="flex w-full flex-row items-stretch gap-[8px]">
                {[
                  ["CRA", d.cra],
                  ["Período", d.periodo],
                  ["Submissões", d.submissoes],
                  ["Reprov./recurso", d.reprov],
                ].map(([k, v]) => (
                  <div key={k} className="flex h-[76px] flex-1 flex-col gap-[2px] rounded-[12px] bg-[#F1F3FA] p-[12px]">
                    <T s={11} tone="secondary">
                      {k}
                    </T>
                    <T s={13} w="medium">
                      {v}
                    </T>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulário gerado */}
          {d && (
            <div className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white p-[20px]">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col gap-[2px]">
                  <T s={15} w="semibold">
                    Formulário de inscrição (gerado do cadastro)
                  </T>
                  <T s={12} tone="secondary">
                    {d.formulario.paginas}
                  </T>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[8px] rounded-[12px] bg-[#F1F3FA] p-[12px]">
                {d.formulario.campos.map(([k, v]) => (
                  <div key={k} className="flex w-full flex-row items-center gap-[12px]">
                    <div className="w-[150px] shrink-0 text-[12px] text-ink-secondary">{k}</div>
                    <div className="flex-1 text-[13px] font-medium text-ink">{v}</div>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-row items-start gap-[8px]">
                <button className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] border border-line bg-transparent px-[16px] py-[8px] hover:bg-soft">
                  <FileText size={16} color="#333333" />
                  <T s={14} w="medium">
                    Ver formulário completo
                  </T>
                </button>
                <button className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] px-[16px] py-[8px] hover:bg-soft">
                  <Printer size={16} color="#333333" />
                  <T s={14} w="medium">
                    Imprimir
                  </T>
                </button>
              </div>
            </div>
          )}

          {/* Documentos */}
          <div className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white p-[20px]">
            <T s={15} w="semibold">
              Documentos anexados
            </T>
            {d ? (
              d.documentos.map((doc) => (
                <div key={doc.nome} className="flex w-full flex-row items-center gap-[12px] rounded-[12px] bg-[#F1F3FA] p-[12px]">
                  <FileText size={18} color="#5F6C85" />
                  <div className="flex h-fit flex-1 flex-col gap-[1px]">
                    <T s={13} w="medium">
                      {doc.nome}
                    </T>
                    <T s={11} tone="secondary">
                      {doc.info}
                    </T>
                  </div>
                  <div
                    className="flex items-center rounded-[16px] px-[4px] py-[2px]"
                    style={{
                      background: doc.statusTone === "success" ? "#17C96426" : doc.statusTone === "warning" ? "#EE992126" : "#EE212E26",
                    }}
                  >
                    <div
                      className="text-[11px] font-medium whitespace-nowrap"
                      style={{ color: doc.statusTone === "success" ? "#17C964" : doc.statusTone === "warning" ? "#B9700C" : "#D31822" }}
                    >
                      {doc.status}
                    </div>
                  </div>
                  <button className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-white">
                    <Eye size={16} color="#333333" />
                  </button>
                  <button className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-white">
                    <Download size={16} color="#333333" />
                  </button>
                </div>
              ))
            ) : (
              <T s={13} tone="secondary">
                Nenhum documento exibido nesta visão de demonstração.
              </T>
            )}
          </div>

          {/* Critérios */}
          <div className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white p-[20px]">
            <T s={15} w="semibold">
              Critérios de avaliação
            </T>
            {CRITERIOS.map((c, i) => (
              <button
                key={c}
                onClick={() => setCriterios((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="flex w-full cursor-pointer flex-row items-center gap-[10px] text-left"
              >
                <div
                  className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[6px] ${
                    criterios[i] ? "bg-accent" : "border border-line bg-white"
                  }`}
                >
                  {criterios[i] && <Check size={10} color="#FCFCFC" />}
                </div>
                <T s={13} tone="secondary">
                  {c}
                </T>
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex h-fit w-[380px] shrink-0 flex-col gap-[16px]">
          {/* Decisão */}
          <div className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white p-[20px]">
            <T s={15} w="semibold">
              Decisão
            </T>
            <div className="flex w-full flex-col gap-[4px]">
              <T s={14} w="medium">
                Status da submissão
              </T>
              <div className="flex h-[36px] w-full shrink-0 items-center justify-between rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className="h-full w-full appearance-none bg-transparent text-[14px] text-ink outline-none"
                >
                  <option value="EM_ANALISE">Em análise</option>
                  <option value="PENDENTE_DOCUMENTOS">Pendente de documentos</option>
                  <option value="APROVADA">Aprovada</option>
                  <option value="INDEFERIDA">Indeferida</option>
                </select>
                <ChevronDown size={16} color="#8A93A8" className="pointer-events-none" />
              </div>
            </div>
            {exigeParecer && (
              <div className="flex w-full flex-col gap-[4px]">
                <T s={14} w="medium">
                  Parecer / Justificativa <span className="text-danger">*</span>
                </T>
                <textarea
                  value={parecer}
                  onChange={(e) => setParecer(e.target.value)}
                  rows={3}
                  placeholder="Descreva o motivo da decisão (obrigatório para Pendente e Indeferida)."
                  className="w-full resize-none rounded-[12px] bg-white p-[10px_12px] text-[13px] text-ink shadow-[0px_1px_2px_0px_#0000000F] outline-none placeholder:text-[#8A93A8] focus:ring-2 focus:ring-accent/40"
                />
              </div>
            )}
            <div className="flex w-full flex-row items-center gap-[10px]">
              <div className="flex w-fit flex-row items-center gap-[12px]">
                <button
                  onClick={() => setParecer(parecer)}
                  className="flex h-[20px] w-[40px] cursor-pointer items-center rounded-full bg-accent relative"
                >
                  <div className="absolute left-[20px] top-[2px] h-[16px] w-[18px] rounded-full bg-[#FCFCFC] shadow-[0px_1px_3px_0px_#0000001A]" />
                </button>
                <T s={14}>Notificações</T>
              </div>
              <T s={13} tone="secondary">
                Notificar o aluno ao publicar
              </T>
            </div>
          </div>

          {/* Histórico */}
          <div className="flex flex-1 flex-col gap-[12px] rounded-[24px] bg-white p-[20px]">
            <T s={15} w="semibold">
              Histórico de status
            </T>
            {(d?.historico ?? []).map((h) => (
              <div key={h.label} className="flex w-full flex-row items-center gap-[10px]">
                <div className="flex w-fit shrink-0 px-[0px] py-[6px]">
                  <div className="h-[8px] w-[8px] rounded-full" style={{ background: h.dot }} />
                </div>
                <div className="flex-1 text-[13px] text-ink">{h.label}</div>
                <T s={11} tone="secondary">
                  {h.data}
                </T>
              </div>
            ))}
            <div className="flex w-full flex-col gap-[8px] pt-[8px]">
              <button className="flex h-[36px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[24px] bg-soft px-[16px] py-[8px] hover:bg-[#E0E4F0]">
                <Save size={16} color="#2158BE" />
                <T s={14} w="medium" tone="accent">
                  Salvar rascunho
                </T>
              </button>
              <button
                onClick={() => nav("/gerenciador/submissoes")}
                disabled={exigeParecer && !parecer.trim()}
                className="flex h-[36px] w-full cursor-pointer items-center justify-center gap-[8px] rounded-[24px] bg-accent px-[16px] py-[8px] transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} color="#FCFCFC" />
                <T s={14} w="medium" tone="inverse">
                  Publicar decisão
                </T>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
