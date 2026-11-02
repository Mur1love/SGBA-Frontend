import { FileText, Download, Eye, Upload } from "lucide-react";
import { EDITAIS } from "../../data/mock";
import { T, Btn } from "../../components/ui";

export default function Editais() {
  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={24} w="semibold">
            Editais
          </T>
          <T s={14} tone="secondary">
            Publicação e gestão dos arquivos oficiais dos editais
          </T>
        </div>
        <Btn variant="primary" icon={<Upload size={16} color="#FCFCFC" />}>
          Publicar edital
        </Btn>
      </div>

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
  );
}
