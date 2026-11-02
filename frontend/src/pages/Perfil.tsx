import { useAuth } from "../context/AuthContext";
import { T, Btn, Input, Field, Divider } from "../components/ui";

const ALUNO_FIELDS: [string, string, string?][] = [
  ["Nome completo", "Beatriz Ramos da Silva"],
  ["CPF", "012.345.678-90"],
  ["Data de nascimento", "14/07/2003"],
  ["Matrícula", "2210457"],
  ["Curso", "Engenharia de Computação"],
  ["Período", "3º"],
  ["CRA", "8,2"],
  ["Unidade Acadêmica", "Escola Politécnica de Pernambuco (POLI)"],
];

const GER_FIELDS: [string, string][] = [
  ["Nome completo", "Marcos Lima"],
  ["E-mail institucional", "marcos.lima@upe.br"],
  ["Setor", "PROPG/UPE"],
  ["Cargo", "Analista de Processos Acadêmicos"],
  ["Telefone", "(81) 3184-7500"],
];

export default function Perfil() {
  const { user } = useAuth();
  if (!user) return null;
  const isAluno = user.role === "aluno";
  const fields = isAluno ? ALUNO_FIELDS : GER_FIELDS;

  return (
    <div className="flex h-full flex-1 flex-col gap-[20px] overflow-y-auto p-[24px_40px]">
      <div className="flex flex-col gap-[4px]">
        <T s={24} w="semibold">
          Meu Perfil
        </T>
        <T s={14} tone="secondary">
          {isAluno
            ? "Mantenha seus dados cadastrais e acadêmicos atualizados"
            : "Dados cadastrais vinculados ao setor PROPG/UPE"}
        </T>
      </div>

      <div className="flex w-full flex-col gap-[20px] rounded-[24px] bg-white p-[24px] shadow-[0px_2px_4px_0px_#0000000A]">
        <div className="flex flex-row items-center gap-[16px]">
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-soft">
            <T s={20} w="semibold">
              {user.initials}
            </T>
          </div>
          <div className="flex flex-col gap-[2px]">
            <T s={18} w="semibold">
              {user.name}
            </T>
            <T s={13} tone="secondary">
              {user.email} · {isAluno ? "Aluno" : "Gerenciador · PROPG/UPE"}
            </T>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-[20px]">
          {fields.map(([label, value]) => (
            <Field key={label} label={label}>
              <Input value={value} />
            </Field>
          ))}
        </div>
        <div className="flex flex-row justify-end gap-[12px]">
          <Btn variant="outline">Cancelar</Btn>
          <Btn variant="primary">Salvar alterações</Btn>
        </div>
      </div>
    </div>
  );
}
