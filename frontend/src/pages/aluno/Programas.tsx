import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, BookOpen, FileText, Download, Eye } from "lucide-react";
import { PROGRAMAS, EDITAIS } from "../../data/mock";
import { T, Chip, Btn, Divider } from "../../components/ui";

const CATEGORIAS = ["Todos", "Iniciação Científica", "Monitoria", "Extensão", "Auxílios"];

export default function Programas() {
  const nav = useNavigate();
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Todos");

  const lista = PROGRAMAS.filter(
    (p) =>
      (cat === "Todos" || p.categoria === cat) &&
      (p.titulo + p.descricao).toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-1 flex-col gap-[28px] overflow-y-auto p-[32px_40px]">
      {/* Header */}
      <div className="flex w-full flex-row items-start justify-between gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <T s={28} w="semibold">
            Programas de Bolsas
          </T>
          <T s={14} tone="secondary">
            Candidaturas abertas para 2025.1
          </T>
        </div>
        <div className="flex flex-col items-end gap-[12px]">
          <div className="flex h-[36px] w-[320px] items-center rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
            <div className="flex flex-1 items-center gap-[6px]">
              <Search size={16} color="#8A93A8" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar programas..."
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
          <div className="flex flex-row items-center gap-[8px]">
            {CATEGORIAS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className="cursor-pointer">
                <Chip tone={cat === c ? "accent" : "soft"}>{c}</Chip>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guia banner */}
      <div className="flex w-full items-center gap-[12px] rounded-[24px] bg-accent-soft px-[16px] py-[14px]">
        <BookOpen size={20} color="#2158BE" />
        <div className="flex-1 text-[14px] font-medium text-accent">
          Novo por aqui? Consulte o Guia de Candidatura passo a passo antes de se inscrever.
        </div>
        <button
          onClick={() => nav("/aluno/guias")}
          className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] px-[12px] py-[8px] hover:bg-[#2158BE33]"
        >
          <T s={13} w="medium">
            Abrir guia
          </T>
        </button>
      </div>

      {/* Cards */}
      <div className="flex w-full flex-col gap-[20px]">
        {[0, 1].map((row) => (
          <div key={row} className="flex w-full flex-row items-start gap-[20px]">
            {lista.slice(row * 3, row * 3 + 3).map((p) => (
              <div
                key={p.id}
                className="flex h-fit flex-1 flex-col gap-[12px] rounded-[24px] bg-white p-[16px] shadow-[0px_2px_4px_0px_#0000000A]"
              >
                <div className="flex w-full flex-row items-center justify-between">
                  <Chip tone={p.categoriaTone === "accent" ? "accent" : "success"}>{p.categoria}</Chip>
                  {p.status && (
                    <Chip tone={p.status.tone === "soft" ? "soft" : p.status.tone}>{p.status.label}</Chip>
                  )}
                </div>
                <div className="w-full text-[17px] font-semibold text-ink">{p.titulo}</div>
                <div className="w-full text-[13px]/[18px] text-ink-secondary">{p.descricao}</div>
                <div className="w-full text-[12px] font-medium text-ink-secondary">{p.meta}</div>
                <Divider />
                <div className="flex w-full flex-row items-center justify-between">
                  <button className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] px-[12px] py-[8px] hover:bg-soft">
                    <FileText size={14} color="#333333" />
                    <T s={13} w="medium">
                      Ver edital
                    </T>
                  </button>
                  <button
                    onClick={() => p.aberto && nav(`/aluno/candidatura/${p.id}`)}
                    disabled={!p.aberto}
                    className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] bg-accent px-[16px] py-[8px] transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <T s={14} w="medium" tone="inverse">
                      Candidatar-se
                    </T>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Editais publicados */}
      <div className="flex w-full flex-col gap-[12px]">
        <T s={18} w="semibold">
          Editais publicados
        </T>
        {EDITAIS.map((e) => (
          <div
            key={e.id}
            className="flex w-full flex-row items-center gap-[12px] rounded-[24px] bg-white px-[16px] py-[12px] shadow-[0px_2px_4px_0px_#0000000A]"
          >
            <FileText size={20} color="#2158BE" />
            <div className="flex flex-1 flex-col gap-[2px]">
              <T s={14} w="medium">
                {e.titulo}
              </T>
              <T s={12} tone="secondary">
                {e.data}
              </T>
            </div>
            <button className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
              <Download size={16} color="#333333" />
            </button>
            <button className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
              <Eye size={16} color="#333333" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
