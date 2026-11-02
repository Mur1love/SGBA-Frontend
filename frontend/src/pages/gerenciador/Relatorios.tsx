import { Download, BarChart3 } from "lucide-react";
import { T, Btn, Card } from "../../components/ui";

export default function Relatorios() {
  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      <div className="flex flex-col gap-[4px]">
        <T s={24} w="semibold">
          Relatórios
        </T>
        <T s={14} tone="secondary">
          Exportação de dados e métricas das seleções
        </T>
      </div>

      <Card className="w-full gap-[16px] rounded-[24px] p-[24px]">
        <div className="flex flex-row items-center gap-[10px]">
          <BarChart3 size={20} color="#2158BE" />
          <T s={18} w="semibold">
            Exportar submissões (CSV)
          </T>
        </div>
        <T s={13} tone="secondary" lh="19px">
          Gera um arquivo CSV com as submissões filtradas contendo: Protocolo, Nome, Matrícula, Curso, CRA,
          Programa, Status e Data de envio.
        </T>
        <div className="flex flex-row gap-[12px]">
          <Btn variant="primary" icon={<Download size={16} color="#FCFCFC" />}>
            Exportar todas
          </Btn>
          <Btn variant="outline">Somente em análise</Btn>
          <Btn variant="outline">Somente pendentes</Btn>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-[16px]">
        {[
          ["Total de submissões", "24"],
          ["Tempo médio de análise", "6,2 dias"],
          ["Taxa de aprovação", "46%"],
        ].map(([k, v]) => (
          <Card key={k} className="gap-[8px] rounded-[24px] p-[16px]">
            <T s={12} w="medium" tone="secondary">
              {k}
            </T>
            <T s={28} w="semibold">
              {v}
            </T>
          </Card>
        ))}
      </div>
    </div>
  );
}
