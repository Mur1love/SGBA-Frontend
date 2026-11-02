import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  TriangleAlert,
  Info,
  FileText,
  Eye,
  Upload,
  Pencil,
} from "lucide-react";
import { T, Divider } from "../../components/ui";

const STEPS = [
  "Dados Pessoais",
  "Dados Acadêmicos",
  "Projeto & Plano de Trabalho",
  "Documentos",
  "Revisão e Envio",
];

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex w-full flex-col rounded-[24px] bg-white p-[20px_24px] shadow-[0px_2px_4px_0px_#0000000A]">
      <div className="flex w-full flex-row items-center gap-[10px]">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <div key={label} className="contents">
              {i > 0 && (
                <div
                  className={`h-[2px] flex-1 rounded-[1px] ${done ? "bg-success" : "bg-soft"}`}
                />
              )}
              <div className="flex w-fit flex-row items-center gap-[10px]">
                <div
                  className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-success" : current ? "bg-accent" : "bg-soft"
                  }`}
                >
                  {done ? (
                    <Check size={16} color="#18181B" />
                  ) : (
                    <T s={14} w="medium" tone={current ? "inverse" : "secondary"}>
                      {i + 1}
                    </T>
                  )}
                </div>
                <T
                  s={13}
                  w={current ? "semibold" : "medium"}
                  tone={done ? "success" : current ? "ink" : "secondary"}
                >
                  {label}
                </T>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  hintTone = "secondary",
  required,
  children,
}: {
  label: string;
  hint?: string;
  hintTone?: "secondary" | "danger" | "success";
  required?: boolean;
  children: ReactNode;
}) {
  const hintColor =
    hintTone === "danger" ? "text-danger" : hintTone === "success" ? "text-success" : "text-ink-secondary";
  return (
    <div className="flex h-fit flex-1 flex-col gap-[4px]">
      <div className="flex w-fit items-center gap-[3px]">
        <T s={14} w="medium">
          {label}
        </T>
        {required && <T s={14} w="medium" tone="danger">*</T>}
      </div>
      {children}
      {hint && <div className="px-[4px] text-[12px] text-left" style={{ color: hintColor === "text-danger" ? "#EE212E" : hintColor === "text-success" ? "#17C964" : "#5F6C85" }}>{hint}</div>}
    </div>
  );
}

const inputCls =
  "w-full rounded-[12px] bg-white px-[12px] text-[14px] text-ink shadow-[0px_1px_2px_0px_#0000000F] outline-none placeholder:text-[#8A93A8] focus:ring-2 focus:ring-accent/40";

function Input({ value, placeholder, error }: { value?: string; placeholder?: string; error?: boolean }) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      className={`${inputCls} h-[40px] ${error ? "border border-danger" : ""}`}
    />
  );
}

function Select({ value, options = [] }: { value: string; options?: string[] }) {
  return (
    <div className="relative flex h-[44px] w-full items-center justify-between rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
      <select
        defaultValue={value}
        className="h-full w-full appearance-none bg-transparent text-[14px] text-ink outline-none"
      >
        <option>{value}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} color="#8A93A8" className="pointer-events-none absolute right-[12px]" />
    </div>
  );
}

function Textarea({ value, placeholder, rows = 3 }: { value?: string; placeholder?: string; rows?: number }) {
  return (
    <textarea
      defaultValue={value}
      placeholder={placeholder}
      rows={rows}
      className={`${inputCls} resize-none py-[10px]`}
    />
  );
}

function Alert({
  icon,
  tone,
  title,
  body,
}: {
  icon: ReactNode;
  tone: "accent" | "warning";
  title: string;
  body: string;
}) {
  const color = tone === "accent" ? "#2158BE" : "#EE9921";
  return (
    <div className="flex w-full flex-row items-start gap-[16px] rounded-[24px] bg-white p-[12px_16px] shadow-[0px_2px_4px_0px_#0000000A]">
      <div className="flex w-fit shrink-0 items-center justify-center p-[4px]">{icon}</div>
      <div className="flex h-fit flex-1 flex-col">
        <div className="text-[14px]/[24px] font-medium" style={{ color }}>
          {title}
        </div>
        <div className="w-full text-[14px] text-ink-secondary">{body}</div>
      </div>
    </div>
  );
}

function CheckRow({ text, s = 14, w = "medium" }: { text: string; s?: number; w?: "medium" | "normal" }) {
  return (
    <label className="flex w-full cursor-pointer flex-row items-start gap-[8px]">
      <input type="checkbox" defaultChecked className="mt-[2px] h-[16px] w-[16px] shrink-0 rounded-[6px] accent-[#2158BE]" />
      <div className={`flex-1 text-[${s}px] text-left text-ink`} style={{ fontSize: s, fontWeight: w === "medium" ? 500 : 400 }}>
        {text}
      </div>
    </label>
  );
}

function DocRow({
  nome,
  info,
  chip,
  chipTone,
  iconColor,
  action,
}: {
  nome: string;
  info: string;
  chip: string;
  chipTone: "success" | "warning" | "soft";
  iconColor: string;
  action?: "upload" | "view";
}) {
  const chipCls =
    chipTone === "success" ? "bg-success" : chipTone === "warning" ? "bg-warning" : "bg-soft";
  return (
    <div className="flex w-full flex-row items-center gap-[16px] rounded-[24px] bg-white p-[12px_16px] shadow-[0px_2px_4px_0px_#0000000A]">
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-white">
        <FileText size={16} color={iconColor} />
      </div>
      <div className="flex h-fit flex-1 flex-col gap-[2px]">
        <div className="w-full text-[14px] font-medium text-ink">{nome}</div>
        <div className="w-full text-[12px] text-ink-secondary">{info}</div>
      </div>
      <div className="flex w-fit shrink-0 flex-row items-center gap-[8px]">
        <div className={`flex w-fit items-center rounded-[16px] px-[4px] py-[2px] ${chipCls}`}>
          <div className="text-[11px] font-medium whitespace-nowrap text-[#18181B]">{chip}</div>
        </div>
        {action === "upload" && (
          <button className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] bg-soft px-[12px] py-[8px] hover:bg-[#E0E4F0]">
            <Upload size={14} color="#333333" />
            <T s={13} w="medium">
              Enviar arquivo
            </T>
          </button>
        )}
        {action === "view" && (
          <button className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[24px] hover:bg-soft">
            <Eye size={14} color="#333333" />
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewSection({
  titulo,
  rows,
  files,
}: {
  titulo: string;
  rows?: [string, string][];
  files?: [string, string][];
}) {
  return (
    <div className="flex w-full flex-col gap-[6px] rounded-[12px] bg-[#EAEDF6] p-[12px]">
      <div className="flex w-full flex-row items-center gap-[8px]">
        <div className="flex-1 text-[13px] font-semibold text-ink">{titulo}</div>
        <button className="flex h-[32px] cursor-pointer items-center gap-[5px] rounded-[24px] bg-soft px-[12px] py-[8px] hover:bg-[#E0E4F0]">
          <Pencil size={14} color="#333333" />
          <T s={13} w="medium">
            Editar
          </T>
        </button>
      </div>
      {rows?.map(([k, v]) => (
        <div key={k} className="flex w-full flex-row items-center gap-[12px]">
          <div className="w-[140px] shrink-0 text-[12px] text-ink-secondary">{k}</div>
          <div className="flex-1 text-[13px] text-ink">{v}</div>
        </div>
      ))}
      {files?.map(([k, v]) => (
        <div key={k} className="flex w-full flex-row items-center gap-[12px]">
          <FileText size={14} color="#5F6C85" />
          <div className="flex-1 text-[13px] text-ink">{k}</div>
          <div className="text-[12px] text-ink-secondary">{v}</div>
        </div>
      ))}
    </div>
  );
}

export default function Candidatura() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const last = step === STEPS.length - 1;

  const content = [
    // 1 · Dados Pessoais
    <>
      <Alert
        icon={<Info size={16} color="#2158BE" />}
        tone="accent"
        title="Dados importados do SGBA"
        body="Sua matrícula e e-mail já foram preenchidos automaticamente. Verifique antes de continuar."
      />
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Nome completo" required hint="Conforme documento oficial com foto.">
          <Input value="Beatriz Ramos" />
        </Field>
        <Field label="CPF" required hint="Será validado na Receita Federal.">
          <Input value="061.923.404-19" />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Data de nascimento" required>
          <Input value="14/02/2004" />
        </Field>
        <Field label="Nacionalidade" required>
          <Input value="Brasileira" />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Gênero">
          <Select value="Prefiro não informar" options={["Feminino", "Masculino", "Outro"]} />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="E-mail institucional" required hint="Preenchido automaticamente pelo SGBA.">
          <Input value="beatriz.ramos@upe.br" />
        </Field>
        <Field label="Telefone / WhatsApp" required hint="Inclua o DDD.">
          <Input value="(81) 9 9654-2210" />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="RG" required hint="Sem pontos ou traços.">
          <Input value="2478113" />
        </Field>
      </div>
      <T s={14} w="semibold">
        Endereço
      </T>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Logradouro" required>
          <Input value="Rua do Hospício, 72" />
        </Field>
        <Field label="Número" required>
          <Input value="72" />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="CEP" required>
          <Input value="50050-000" />
        </Field>
        <Field label="Bairro" required>
          <Input value="Santo Amaro" />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Cidade" required>
          <Input value="Recife" />
        </Field>
        <Field label="UF" required>
          <Select value="PE" options={["PE", "SP", "RJ", "BA"]} />
        </Field>
      </div>
    </>,
    // 2 · Dados Acadêmicos
    <>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Matrícula" required hint="Número do seu registro acadêmico.">
          <Input value="2023.1.0458" />
        </Field>
        <Field label="Curso" required>
          <Select value="Engenharia de Computação" options={["Ciência da Computação", "Engenharia Elétrica"]} />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Período atual" required hint="Período letivo em andamento.">
          <Input value="2025.1" />
        </Field>
        <Field label="Semestre de ingresso" required>
          <Select value="2023.2" options={["2023.1", "2022.2"]} />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="CRA / Coeficiente de Rendimento" required hint="Mínimo exigido: 7.0" hintTone="success">
          <div className="flex h-[44px] w-full items-center justify-between rounded-[12px] bg-white px-[12px] shadow-[0px_1px_2px_0px_#0000000F]">
            <input defaultValue="8.4" className="h-full flex-1 bg-transparent text-[14px] text-ink outline-none" />
            <Check size={16} color="#17C964" />
          </div>
        </Field>
        <Field label="Unidade Acadêmica" required>
          <Select value="Escola Politécnica de Pernambuco" options={["FCAP", "Faculdade de Direito"]} />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Orientador pretendido" required hint="Informe o orientador pretendido" hintTone="danger">
          <Input placeholder="Nome completo do orientador" error />
        </Field>
        <Field label="E-mail do orientador" required hint="E-mail institucional do orientador.">
          <Input placeholder="orientador@upe.br" />
        </Field>
      </div>
    </>,
    // 3 · Projeto
    <>
      <Alert
        icon={<TriangleAlert size={16} color="#EE9921" />}
        tone="warning"
        title="Atenção"
        body="O plano de trabalho final em PDF, assinado pelo orientador, será anexado na etapa de Documentos."
      />
      <Field label="Título do projeto" required hint="Máximo de 120 caracteres.">
        <Textarea
          value="Biossensores de baixo custo para monitorar a qualidade da água em reservatórios urbanos do Recife"
        />
      </Field>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Linha de pesquisa" required>
          <Input value="Recursos Hídricos e Saneamento Ambiental" />
        </Field>
        <Field label="Grande área — CAPES" required>
          <Select value="Engenharia III — Saneamento (3.07.00.00)" options={["Ciência da Computação (1.02.00.00)"]} />
        </Field>
      </div>
      <Field label="Palavras-chave" required hint="Três termos separados por ponto e vírgula.">
        <Input value="biossensores; qualidade da água; reservatórios urbanos" />
      </Field>
      <Field label="Resumo do projeto" required hint="Máximo de 2.000 caracteres.">
        <Textarea
          rows={3}
          value="Desenvolve biossensores de baixo custo (eletrodos impressos e leitura aberta) para o monitoramento contínuo da qualidade da água em reservatórios urbanos do Recife, alimentando um painel de gestão hídrica em tempo real."
        />
      </Field>
      <Field label="Justificativa e objetivos" required hint="Máximo de 2.000 caracteres.">
        <Textarea
          rows={3}
          value="Reservatórios urbanos ainda dependem de amostragens manuais esparsas. Sensores em tempo real detectam eventos de degradação precocemente e orientam a gestão hídrica municipal."
        />
      </Field>
      <Field label="Metodologia e cronograma (24 meses)" required hint="Máximo de 2.000 caracteres.">
        <Textarea
          rows={3}
          value="T1 · Revisão e protótipo (1–6) · T2 · Calibração em campo (7–12) · T3 · Painel de dados e validação (13–18) · T4 · Relatório final e artigo (19–24)"
        />
      </Field>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Carga horária semanal" required>
          <Input value="20" />
        </Field>
        <Field label="Duração da bolsa" required>
          <Select value="24 meses" options={["12 meses"]} />
        </Field>
      </div>
      <div className="flex w-full flex-row items-start gap-[20px]">
        <Field label="Local de execução" required>
          <Input value="Escola Politécnica — Campus Recife" />
        </Field>
        <Field label="Coorientador">
          <Select value="Não possui" options={["Possui"]} />
        </Field>
      </div>
    </>,
    // 4 · Documentos
    <>
      <Alert
        icon={<Info size={16} color="#2158BE" />}
        tone="accent"
        title="4 de 5 documentos obrigatórios enviados"
        body="Falta o Plano de Trabalho assinado pelo orientador. Salve um rascunho e conclua o envio depois."
      />
      <DocRow
        nome="Documento de identificação (RG ou CNH)"
        info="Obrigatório · PDF · 1,2 MB · enviado em 14/09/2025 às 09:12"
        chip="Enviado"
        chipTone="success"
        iconColor="#5F6C85"
        action="view"
      />
      <DocRow
        nome="Comprovante de residência"
        info="Obrigatório · PDF · 0,4 MB · enviado em 14/09/2025 às 09:14"
        chip="Enviado"
        chipTone="success"
        iconColor="#5F6C85"
        action="view"
      />
      <DocRow
        nome="Histórico escolar atualizado"
        info="Obrigatório · PDF · 2,8 MB · enviado em 14/09/2025 às 09:18"
        chip="Enviado"
        chipTone="success"
        iconColor="#5F6C85"
        action="view"
      />
      <DocRow
        nome="Plano de trabalho assinado pelo orientador"
        info="Obrigatório · aguardando envio do PDF assinado"
        chip="Pendente"
        chipTone="warning"
        iconColor="#EE9921"
        action="upload"
      />
      <DocRow
        nome="Certificado de matrícula / declaração da UPE"
        info="Obrigatório · PDF · 0,7 MB · enviado em 14/09/2025 às 09:21"
        chip="Enviado"
        chipTone="success"
        iconColor="#5F6C85"
        action="view"
      />
      <DocRow
        nome="Carta de apresentação do orientador"
        info="Envio opcional · valoriza a candidatura na análise"
        chip="Opcional"
        chipTone="soft"
        iconColor="#5F6C85"
        action="upload"
      />
    </>,
    // 5 · Revisão
    <>
      <ReviewSection
        titulo="Dados Pessoais"
        rows={[
          ["Nome completo", "Beatriz Ramos"],
          ["CPF", "061.923.404-19"],
          ["E-mail · Telefone", "beatriz.ramos@upe.br · (81) 9 9654-2210"],
          ["Endereço", "Rua do Hospício, 72 — Santo Amaro, Recife/PE"],
        ]}
      />
      <ReviewSection
        titulo="Dados Acadêmicos"
        rows={[
          ["Matrícula · Curso", "2023.1.0458 · Engenharia de Computação"],
          ["Semestre · CRA", "2023.2 · CRA 8,4"],
          ["Orientador pretendido", "Prof. Dr. Carlos E. Andrade — DEINFO"],
        ]}
      />
      <ReviewSection
        titulo="Projeto & Plano de Trabalho"
        rows={[
          ["Título do projeto", "Biossensores de baixo custo para monitorar a qualidade da água em reservatórios urbanos do Recife"],
          ["Linha de pesquisa", "Recursos Hídricos e Saneamento Ambiental"],
          ["Carga · Duração", "20 h / semana · 24 meses"],
        ]}
      />
      <ReviewSection
        titulo="Documentos"
        files={[
          ["Documento de identificação (RG ou CNH)", "PDF · 1,2 MB"],
          ["Comprovante de residência", "PDF · 0,4 MB"],
          ["Histórico escolar atualizado", "PDF · 2,8 MB"],
          ["Plano de trabalho assinado pelo orientador", "PDF · 1,6 MB"],
        ]}
      />
      <div className="flex w-full flex-col gap-[12px]">
        <CheckRow s={13} w="normal" text="Declaro que as informações prestadas são verdadeiras e correspondem aos documentos anexados." />
        <CheckRow s={13} w="normal" text="Li e concordo integralmente com o Edital 04/2025 — PIBIC Iniciação Científica 2025.1 e seus anexos." />
        <CheckRow s={13} w="normal" text="Autorizo o tratamento dos meus dados pessoais para fins deste processo seletivo (LGPD · Lei 13.709/2018)." />
      </div>
      <Alert
        icon={<Info size={16} color="#2158BE" />}
        tone="accent"
        title="Pronto para envio"
        body="Ao enviar, o SGBA gera o Formulário de Inscrição em PDF e a candidatura recebe o status Recebida."
      />
    </>,
  ];

  const declarations = [
    "Declaro que os dados pessoais correspondem aos meus documentos oficiais.",
    "Declaro que as informações acadêmicas são verdadeiras.",
    "Declaro que o plano de trabalho será desenvolvido sob a orientação do professor indicado na etapa anterior.",
    "Declaro que os documentos anexados são cópias fiéis dos originais.",
  ];

  const headers = [
    ["1 · Dados Pessoais", "Identificação e contato, exatamente como nos seus documentos oficiais.", "Campos com * são obrigatórios"],
    ["2 · Dados Acadêmicos", "Dados da sua trajetória acadêmica na UPE.", "Campos com * são obrigatórios"],
    ["3 · Projeto & Plano de Trabalho", "Descreva a proposta que será desenvolvida durante a bolsa.", "Campos com * são obrigatórios"],
    ["4 · Documentos", "Anexe em PDF, JPG ou PNG os documentos exigidos pelo Edital 04/2025.", "Até 10 MB por arquivo"],
    ["5 · Revisão e envio", "Revise cada etapa da candidatura antes de enviar.", "Última etapa do formulário"],
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-[24px] overflow-y-auto p-[36px_40px]">
      {/* Header */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <T s={26} w="semibold">
            Candidatura — PIBIC Iniciação Científica 2025.1
          </T>
          <T s={14} tone="secondary">
            Edital 04/2025 · Programa Integrado de Bolsas de Iniciação Científica · UPE
          </T>
        </div>
        <div className="flex items-center gap-[4px] rounded-[16px] bg-[#17C96426] px-[8px] py-[2px]">
          <Check size={12} color="#17C964" />
          <T s={12} w="medium" tone="success">
            Rascunho salvo
          </T>
        </div>
      </div>

      <Stepper step={step} />

      {/* Content */}
      <div className="flex w-full flex-col gap-[24px] rounded-[24px] bg-white p-[30px_32px] shadow-[0px_2px_4px_0px_#0000000A]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-[4px]">
            <T s={18} w="semibold">
              {headers[step][0]}
            </T>
            <T s={13} tone="secondary">
              {headers[step][1]}
            </T>
          </div>
          <T s={12} tone="tertiary">
            {headers[step][2]}
          </T>
        </div>
        <Divider />
        <div className="flex w-full flex-col gap-[26px]">{content[step]}</div>
        <Divider />
        {step < 4 && <CheckRow text={declarations[step]} />}
      </div>

      {/* Footer bar */}
      <div className="flex w-full flex-row items-center justify-between rounded-[24px] bg-[#F1F3FA] p-[14px_20px]">
        <button
          onClick={() => (step === 0 ? nav("/aluno/programas") : setStep(step - 1))}
          className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] px-[16px] py-[8px] hover:bg-[#E0E4F0]"
        >
          <ChevronLeft size={16} color="#333333" />
          <T s={14} w="medium">
            Voltar
          </T>
        </button>
        <div className="flex flex-row items-center gap-[12px]">
          <button className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] bg-soft px-[16px] py-[8px] hover:bg-[#E0E4F0]">
            <Download size={16} color="#333333" />
            <T s={14} w="medium">
              Baixar PDF parcial
            </T>
          </button>
          <button
            onClick={() => (last ? nav("/aluno/submissoes") : setStep(step + 1))}
            className="flex h-[36px] cursor-pointer items-center gap-[8px] rounded-[24px] bg-accent px-[16px] py-[8px] transition-colors hover:bg-accent-hover"
          >
            {last ? (
              <Check size={16} color="#FCFCFC" />
            ) : (
              <ChevronRight size={16} color="#FCFCFC" />
            )}
            <T s={14} w="medium" tone="inverse">
              {last ? "Enviar candidatura" : "Salvar e continuar"}
            </T>
          </button>
        </div>
      </div>
    </div>
  );
}
