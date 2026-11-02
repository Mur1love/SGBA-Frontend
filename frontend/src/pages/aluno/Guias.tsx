import { FileText, Download, Eye, BookOpen, CheckCircle2 } from "lucide-react";
import { EDITAIS } from "../../data/mock";
import { T, Divider } from "../../components/ui";

const PASSOS = [
  {
    titulo: "1 · Escolha o programa",
    texto: "Consulte o catálogo de Programas de Bolsas, filtre por categoria e leia atentamente o edital antes de iniciar a inscrição.",
  },
  {
    titulo: "2 · Preencha a candidatura",
    texto: "O formulário é dividido em etapas: Dados Pessoais, Dados Acadêmicos, Projeto & Plano de Trabalho e Documentos. Você pode salvar um rascunho e retomar depois.",
  },
  {
    titulo: "3 · Anexe os documentos",
    texto: "Envie os documentos obrigatórios em PDF (até 10 MB por arquivo): histórico escolar, comprovante de matrícula e carta de intenção assinada.",
  },
  {
    titulo: "4 · Revise e envie",
    texto: "Na etapa de Revisão, confira todas as informações, aceite os termos e envie. O SGBA gera automaticamente o Formulário de Inscrição em PDF.",
  },
  {
    titulo: "5 · Acompanhe o andamento",
    texto: "Em Minhas Submissões você acompanha a linha do tempo da candidatura e resolve pendências documentais apontadas pela comissão.",
  },
];

export default function Guias() {
  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      <div className="flex flex-col gap-[4px]">
        <T s={24} w="semibold">
          Editais & Guias
        </T>
        <T s={14} tone="secondary">
          Orientações passo a passo para candidatura e editais publicados
        </T>
      </div>

      <div className="flex w-full flex-col gap-[16px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_4px_0px_#0000000A]">
        <div className="flex flex-row items-center gap-[10px]">
          <BookOpen size={20} color="#2158BE" />
          <T s={18} w="semibold">
            Guia de Candidatura
          </T>
        </div>
        <Divider />
        <div className="flex flex-col gap-[14px]">
          {PASSOS.map((p) => (
            <div key={p.titulo} className="flex flex-row items-start gap-[12px]">
              <CheckCircle2 size={18} color="#17C964" className="mt-[2px] shrink-0" />
              <div className="flex flex-col gap-[2px]">
                <T s={14} w="semibold">
                  {p.titulo}
                </T>
                <T s={13} tone="secondary" lh="19px">
                  {p.texto}
                </T>
              </div>
            </div>
          ))}
        </div>
      </div>

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
