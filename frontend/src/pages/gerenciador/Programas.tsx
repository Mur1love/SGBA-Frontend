import { useState } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import { PROGRAMAS } from "../../data/mock";
import { T, Chip, Btn, Divider } from "../../components/ui";

const STATUS_CHIP: Record<string, { tone: "success" | "warning" | "soft"; label: string }> = {
  aberto: { tone: "success", label: "Aberto" },
  embreve: { tone: "warning", label: "Em breve" },
  encerrado: { tone: "soft", label: "Encerrado" },
};

export default function GerProgramas() {
  const [busca, setBusca] = useState("");
  const lista = PROGRAMAS.filter((p) => p.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={24} w="semibold">
            Programas & Editais
          </T>
          <T s={14} tone="secondary">
            Cadastre, edite e gerencie os programas de bolsas e auxílios
          </T>
        </div>
        <Btn variant="primary" icon={<Plus size={16} color="#FCFCFC" />}>
          Novo programa
        </Btn>
      </div>

      <div className="flex h-[36px] w-[320px] items-center rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
        <Search size={16} color="#8A93A8" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar programa..."
          className="ml-[6px] w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-[#8A93A8]"
        />
      </div>

      <div className="flex w-full flex-col gap-[2px] rounded-[16px] bg-[#F1F3FA] p-[4px]">
        <div className="flex h-[33px] w-full shrink-0 flex-row items-center gap-[2px] px-[12px]">
          {[
            ["Programa", 0, true],
            ["Categoria", 180, false],
            ["Valor · Vagas", 160, false],
            ["Período letivo", 120, false],
            ["Data limite", 120, false],
            ["Status", 130, false],
            ["", 90, false],
          ].map(([label, w, flex], i) => (
            <div
              key={i}
              className={`flex h-full items-center px-[16px] py-[10px] ${flex ? "flex-1" : "shrink-0"}`}
              style={flex ? undefined : { width: w as number }}
            >
              <T s={11} w="medium" tone="secondary" className="tracking-[0.5px]">
                {label}
              </T>
            </div>
          ))}
        </div>
        {lista.map((p) => {
          const st = STATUS_CHIP[p.aberto ? "aberto" : p.status?.label === "Em breve" ? "embreve" : "encerrado"];
          const [valor, vagas, prazo] = p.meta.split(" · ");
          return (
            <div key={p.id} className="flex h-[56px] w-full shrink-0 flex-row items-center gap-[2px]">
              <div className="flex h-full flex-1 flex-col justify-center gap-[2px] rounded-l-[8px] bg-white px-[16px]">
                <T s={13} w="medium">
                  {p.titulo}
                </T>
              </div>
              <div className="flex h-full w-[180px] shrink-0 items-center bg-white px-[16px]">
                <Chip tone={p.categoriaTone === "accent" ? "accent" : "success"}>{p.categoria}</Chip>
              </div>
              <div className="flex h-full w-[160px] shrink-0 items-center bg-white px-[16px]">
                <T s={13} tone="secondary">
                  {valor} · {vagas}
                </T>
              </div>
              <div className="flex h-full w-[120px] shrink-0 items-center bg-white px-[16px]">
                <T s={13} tone="secondary">
                  2025.1
                </T>
              </div>
              <div className="flex h-full w-[120px] shrink-0 items-center bg-white px-[16px]">
                <T s={13} tone="secondary">
                  {prazo?.replace("até ", "").replace("a partir de ", "")}
                </T>
              </div>
              <div className="flex h-full w-[130px] shrink-0 items-center bg-white px-[16px]">
                <Chip tone={st.tone}>{st.label}</Chip>
              </div>
              <div className="flex h-full w-[90px] shrink-0 items-center justify-end rounded-r-[8px] bg-white px-[16px]">
                <button className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
                  <Pencil size={14} color="#333333" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full flex-col gap-[12px] rounded-[24px] bg-white p-[20px] shadow-[0px_2px_4px_0px_#0000000A]">
        <T s={15} w="semibold">
          Editais vinculados
        </T>
        <Divider />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <T s={14} w="medium">
              Edital Nº 012/2025 — PROPG
            </T>
            <T s={12} tone="secondary">
              Ano 2025 · Publicado em 02/03/2025 · edital_012_2025.pdf
            </T>
          </div>
          <Btn variant="outline" h={32} px={12}>
            Substituir PDF
          </Btn>
        </div>
        <Divider />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <T s={14} w="medium">
              Edital Nº 009/2025 — Monitoria
            </T>
            <T s={12} tone="secondary">
              Ano 2025 · Publicado em 18/02/2025 · edital_009_2025.pdf
            </T>
          </div>
          <Btn variant="outline" h={32} px={12}>
            Substituir PDF
          </Btn>
        </div>
      </div>
    </div>
  );
}
