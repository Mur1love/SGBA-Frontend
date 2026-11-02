export type ProgramaStatus = "aberto" | "embreve" | "encerrado";

export interface Programa {
  id: number;
  categoria: string;
  categoriaTone: "accent" | "success";
  titulo: string;
  descricao: string;
  meta: string;
  status?: { label: string; tone: "success" | "warning" | "soft" };
  aberto: boolean;
}

export const PROGRAMAS: Programa[] = [
  {
    id: 1,
    categoria: "Iniciação Científica",
    categoriaTone: "accent",
    titulo: "PIBIC — Iniciação Científica",
    descricao:
      "Bolsas para projetos de pesquisa de iniciação científica em todas as áreas do conhecimento.",
    meta: "R$ 780/mês · 40 vagas · até 15/03/2025",
    status: { label: "Inscrições abertas", tone: "success" },
    aberto: true,
  },
  {
    id: 2,
    categoria: "Monitoria",
    categoriaTone: "success",
    titulo: "Monitoria — Cálculo I",
    descricao:
      "Apoio ao ensino de graduação com monitoria das turmas de Cálculo I do primeiro período.",
    meta: "R$ 620/mês · 8 vagas · até 20/03/2025",
    aberto: true,
  },
  {
    id: 3,
    categoria: "Extensão",
    categoriaTone: "success",
    titulo: "PROEX — Extensão Universitária",
    descricao:
      "Projetos de extensão que conectam a universidade às necessidades da comunidade.",
    meta: "R$ 540/mês · 25 vagas · até 28/03/2025",
    aberto: true,
  },
  {
    id: 4,
    categoria: "Auxílios",
    categoriaTone: "success",
    titulo: "Auxílio Permanência",
    descricao:
      "Apoio financeiro para estudantes em situação de vulnerabilidade socioeconômica.",
    meta: "R$ 400/mês · 60 vagas · até 18/03/2025",
    status: { label: "Encerra em 3 dias", tone: "warning" },
    aberto: true,
  },
  {
    id: 5,
    categoria: "Pesquisa",
    categoriaTone: "accent",
    titulo: "PAIP — Apoio à Pesquisa",
    descricao: "Financiamento auxiliar para grupos de pesquisa e laboratórios da UPE.",
    meta: "R$ 700/mês · 15 vagas · até 30/03/2025",
    aberto: true,
  },
  {
    id: 6,
    categoria: "Iniciação Tecnológica",
    categoriaTone: "accent",
    titulo: "PIBITI — Iniciação Tecnológica",
    descricao:
      "Bolsas voltadas ao desenvolvimento tecnológico, inovação e transferência de conhecimento.",
    meta: "R$ 780/mês · 20 vagas · a partir de 01/04/2025",
    status: { label: "Em breve", tone: "soft" },
    aberto: false,
  },
];

export const EDITAIS = [
  { id: 1, titulo: "Edital Nº 012/2025 — PROPG", data: "Publicado em 02/03/2025" },
  { id: 2, titulo: "Edital Nº 009/2025 — Monitoria", data: "Publicado em 18/02/2025" },
];

export type SubStatus =
  | "RASCUNHO"
  | "RECEBIDA"
  | "EM_ANALISE"
  | "PENDENTE_DOCUMENTOS"
  | "APROVADA"
  | "INDEFERIDA";

export const STATUS_LABEL: Record<SubStatus, string> = {
  RASCUNHO: "Rascunho",
  RECEBIDA: "Recebida",
  EM_ANALISE: "Em análise",
  PENDENTE_DOCUMENTOS: "Pendente",
  APROVADA: "Aprovada",
  INDEFERIDA: "Indeferida",
};

export interface Submissao {
  id: number;
  protocolo: string;
  programa: string;
  categoria: string;
  aluno: string;
  matricula: string;
  curso: string;
  cra: number;
  periodo: number;
  email: string;
  orientador?: string;
  dataEnvio: string;
  docs: number;
  status: SubStatus;
  pendencia?: string;
  timeline: { titulo: string; data: string; autor?: string; obs?: string; dot?: string }[];
}

export const SUBMISSOES: Submissao[] = [
  {
    id: 1,
    protocolo: "#2025-0142",
    programa: "PIBIC — Iniciação Científica 2025.1",
    categoria: "Iniciação Científica",
    aluno: "Ana Souza",
    matricula: "2023.1.0458",
    curso: "Engenharia de Computação",
    cra: 8.4,
    periodo: 6,
    email: "beatriz.ramos@upe.br",
    orientador: "Prof. Paulo Meleiro",
    dataEnvio: "12/03/2025",
    docs: 1,
    status: "EM_ANALISE",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "12/03/2025 · 14:32", obs: "Formulário de inscrição gerado em PDF e assinado.", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "13/03/2025 · 09:15", obs: "Submissão encaminhada à comissão do programa.", dot: "#2158BE" },
      { titulo: "Pendência documental", data: "18/03/2025 · 09:41", obs: "Comprovante de matrícula anexado está vencido (12/2024).", dot: "#EE9921" },
      { titulo: "Em análise final", data: "Aguardando correção", obs: "A análise retoma após o envio do documento atualizado.", dot: "#E7EBF5" },
    ],
  },
  {
    id: 2,
    protocolo: "#2025-0158",
    programa: "Monitoria — Cálculo I",
    categoria: "Monitoria",
    aluno: "Ana Souza",
    matricula: "2023.1.0458",
    curso: "Engenharia de Computação",
    cra: 8.4,
    periodo: 6,
    email: "beatriz.ramos@upe.br",
    orientador: "Prof.ª Helena Costa",
    dataEnvio: "10/03/2025",
    docs: 1,
    status: "PENDENTE_DOCUMENTOS",
    pendencia: "Comprovante de matrícula anexado está vencido (12/2024). Reenvie o documento atualizado.",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "10/03/2025 · 11:02", obs: "Formulário de inscrição gerado em PDF e assinado.", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "10/03/2025 · 16:20", obs: "Submissão encaminhada à comissão do programa.", dot: "#2158BE" },
      {
        titulo: "Pendência documental",
        data: "14/03/2025 · 09:41",
        obs: "Comprovante de matrícula anexado está vencido (12/2024).",
        dot: "#EE9921",
      },
    ],
  },
  {
    id: 3,
    protocolo: "#2025-0117",
    programa: "Auxílio Permanência",
    categoria: "Auxílio",
    aluno: "Ana Souza",
    matricula: "2023.1.0458",
    curso: "Engenharia de Computação",
    cra: 8.4,
    periodo: 6,
    email: "beatriz.ramos@upe.br",
    dataEnvio: "05/03/2025",
    docs: 2,
    status: "APROVADA",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "05/03/2025 · 09:15", obs: "Formulário de inscrição gerado em PDF e assinado.", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "05/03/2025 · 14:40", obs: "Submissão encaminhada à comissão do programa.", dot: "#2158BE" },
      {
        titulo: "Aprovada",
        data: "12/03/2025 · 17:05",
        obs: "Perfil socioeconômico compatível com os critérios do edital.",
        dot: "#17C964",
      },
    ],
  },
  {
    id: 4,
    protocolo: "#2025-0093",
    programa: "PAIP — Apoio à Pesquisa",
    categoria: "Pesquisa Aplicada",
    aluno: "Ana Souza",
    matricula: "2023.1.0458",
    curso: "Engenharia de Computação",
    cra: 8.4,
    periodo: 6,
    email: "beatriz.ramos@upe.br",
    orientador: "Prof. Paulo Meleiro",
    dataEnvio: "28/02/2025",
    docs: 1,
    status: "INDEFERIDA",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "28/02/2025 · 15:22", obs: "Formulário de inscrição gerado em PDF e assinado.", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "01/03/2025 · 08:31", obs: "Submissão encaminhada à comissão do programa.", dot: "#2158BE" },
      {
        titulo: "Indeferida",
        data: "07/03/2025 · 11:12",
        obs: "Carga horária do projeto não atende ao mínimo exigido no edital.",
        dot: "#EE212E",
      },
    ],
  },
  {
    id: 5,
    protocolo: "#2025-0161",
    programa: "PIBIC — Iniciação Científica 2025.1",
    categoria: "Iniciação Científica",
    aluno: "Bruno Costa",
    matricula: "2020.2-EE-0117",
    curso: "Engenharia Elétrica",
    cra: 7.9,
    periodo: 8,
    email: "bruno.costa@upe.br",
    orientador: "Prof. Ricardo Nunes",
    dataEnvio: "11/03/2025",
    docs: 3,
    status: "EM_ANALISE",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "11/03/2025 · 11:05", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "11/03/2025 · 18:40", dot: "#2158BE" },
    ],
  },
  {
    id: 6,
    protocolo: "#2025-0160",
    programa: "Monitoria — Cálculo I",
    categoria: "Monitoria",
    aluno: "Carla Mendes",
    matricula: "2022.1-MA-0451",
    curso: "Matemática",
    cra: 9.1,
    periodo: 5,
    email: "carla.mendes@upe.br",
    orientador: "Prof. Paulo Meleiro",
    dataEnvio: "10/03/2025",
    docs: 3,
    status: "EM_ANALISE",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "10/03/2025 · 08:47", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "11/03/2025 · 09:02", dot: "#2158BE" },
    ],
  },
  {
    id: 7,
    protocolo: "#2025-0155",
    programa: "Auxílio Permanência",
    categoria: "Auxílio",
    aluno: "Diego Alves",
    matricula: "2021.2-AD-0308",
    curso: "Administração",
    cra: 6.8,
    periodo: 6,
    email: "diego.alves@upe.br",
    dataEnvio: "09/03/2025",
    docs: 4,
    status: "PENDENTE_DOCUMENTOS",
    pendencia: "Carta de intenção sem assinatura. Reenvie o documento assinado.",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "09/03/2025 · 19:30", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "10/03/2025 · 08:15", dot: "#2158BE" },
      {
        titulo: "Pendência documental",
        data: "13/03/2025 · 14:20",
        obs: "Carta de intenção sem assinatura. Reenvie o documento assinado.",
        dot: "#EE9921",
      },
    ],
  },
  {
    id: 8,
    protocolo: "#2025-0149",
    programa: "PAIP — Apoio à Pesquisa",
    categoria: "Pesquisa Aplicada",
    aluno: "Fernanda Rios",
    matricula: "2019.1-BM-0009",
    curso: "Biomedicina",
    cra: 8.8,
    periodo: 10,
    email: "fernanda.rios@upe.br",
    orientador: "Prof.ª Paula Sampaio",
    dataEnvio: "06/03/2025",
    docs: 5,
    status: "APROVADA",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "06/03/2025 · 10:12", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "06/03/2025 · 16:44", dot: "#2158BE" },
      {
        titulo: "Aprovada",
        data: "10/03/2025 · 15:30",
        obs: "Projeto alinhado ao edital, documentação completa.",
        dot: "#17C964",
      },
    ],
  },
  {
    id: 9,
    protocolo: "#2025-0146",
    programa: "PROEX — Extensão Universitária",
    categoria: "Extensão",
    aluno: "Rafael Lima",
    matricula: "2022.2-SI-0512",
    curso: "Sistemas de Informação",
    cra: 7.2,
    periodo: 4,
    email: "rafael.lima@upe.br",
    dataEnvio: "05/03/2025",
    docs: 2,
    status: "INDEFERIDA",
    timeline: [
      { titulo: "Enviada pelo aluno", data: "05/03/2025 · 13:58", dot: "#17C964" },
      { titulo: "Recebida pela PROPG", data: "07/03/2025 · 09:21", dot: "#2158BE" },
      {
        titulo: "Indeferida",
        data: "12/03/2025 · 10:05",
        obs: "Reprovação em disciplina obrigatória no último período.",
        dot: "#EE212E",
      },
    ],
  },
];

export const DOCUMENTOS = [
  { id: 1, tipo: "Histórico Escolar", nome: "historico_2025.pdf", tamanho: "1,2 MB", status: "Válido" },
  { id: 2, tipo: "Comprovante de Matrícula", nome: "comprovante_matricula.pdf", tamanho: "0,4 MB", status: "Válido" },
  { id: 3, tipo: "Carta de Intenção", nome: "carta_intencao_assinada.pdf", tamanho: "0,8 MB", status: "Válido" },
];

export interface GerSubmissao {
  id: number;
  protocolo: string;
  aluno: string;
  iniciais: string;
  cursoPeriodo: string;
  programa: string;
  dataEnvio: string;
  status: SubStatus;
  avaliavel: boolean;
  detalhe?: {
    email: string;
    cra: string;
    periodo: string;
    submissoes: string;
    reprov: string;
    formulario: {
      paginas: string;
      campos: [string, string][];
      orientadorOrg: string;
    };
    documentos: { nome: string; info: string; status: string; statusTone: "success" | "warning" | "danger" }[];
    historico: { label: string; data: string; dot: string }[];
  };
}

export const GER_SUBMISSOES: GerSubmissao[] = [
  {
    id: 1,
    protocolo: "#2025-0163",
    aluno: "Beatriz Ramos",
    iniciais: "BR",
    cursoPeriodo: "Eng. Computação, 3º",
    programa: "PIBIC — Iniciação Científica",
    dataEnvio: "15/03/2025",
    status: "PENDENTE_DOCUMENTOS",
    avaliavel: true,
    detalhe: {
      email: "beatriz.ramos@upe.br",
      cra: "8,2",
      periodo: "3º",
      submissoes: "2",
      reprov: "Nenhum",
      formulario: {
        paginas: "PDF · 2 páginas",
        orientadorOrg: "(DSC/UPE)",
        campos: [
          ["Nome completo", "Beatriz Ramos da Silva"],
          ["CPF", "012.345.678-90"],
          ["Data de nascimento", "14/07/2003"],
          ["Curso", "Engenharia de Computação"],
          ["CRA declarado", "8,2"],
          ["Orientador pretendido", "Prof. Paulo Meleiro (DSC/UPE)"],
        ],
      },
      documentos: [
        { nome: "Histórico escolar atualizado", info: "PDF · 1,2 MB · enviado 15/03/2025", status: "Válido", statusTone: "success" },
        { nome: "Comprovante de matrícula", info: "PDF · 0,4 MB · enviado 15/03/2025", status: "Vencido 12/2024", statusTone: "warning" },
        { nome: "Carta de intenção assinada", info: "PDF · 0,8 MB · enviado 15/03/2025", status: "Válido", statusTone: "success" },
      ],
      historico: [
        { label: "Recebida", data: "15/03/2025 · 09:12", dot: "#17C964" },
        { label: "Em análise pela comissão", data: "16/03/2025 · 10:40", dot: "#2158BE" },
        { label: "Pendência documental", data: "18/03/2025 · 09:41", dot: "#EE9921" },
      ],
    },
  },
  {
    id: 2,
    protocolo: "#2025-0162",
    aluno: "Carlos Andrade",
    iniciais: "CA",
    cursoPeriodo: "Eng. Elétrica, 5º",
    programa: "Monitoria — Cálculo I",
    dataEnvio: "15/03/2025",
    status: "EM_ANALISE",
    avaliavel: true,
  },
  {
    id: 3,
    protocolo: "#2025-0161",
    aluno: "Diego Ferreira",
    iniciais: "DF",
    cursoPeriodo: "Administração, 2º",
    programa: "Auxílio Permanência",
    dataEnvio: "14/03/2025",
    status: "EM_ANALISE",
    avaliavel: true,
  },
  {
    id: 4,
    protocolo: "#2025-0160",
    aluno: "Elisa Nunes",
    iniciais: "EN",
    cursoPeriodo: "Letras, 4º",
    programa: "PIBIC — Iniciação Científica",
    dataEnvio: "14/03/2025",
    status: "APROVADA",
    avaliavel: false,
  },
  {
    id: 5,
    protocolo: "#2025-0159",
    aluno: "Felipe Torres",
    iniciais: "FT",
    cursoPeriodo: "Matemática, 6º",
    programa: "PAIP — Apoio à Pesquisa",
    dataEnvio: "13/03/2025",
    status: "INDEFERIDA",
    avaliavel: false,
  },
  {
    id: 6,
    protocolo: "#2025-0158",
    aluno: "Ana Souza",
    iniciais: "AS",
    cursoPeriodo: "Eng. Computação, 4º",
    programa: "Monitoria — Cálculo I",
    dataEnvio: "10/03/2025",
    status: "PENDENTE_DOCUMENTOS",
    avaliavel: true,
  },
];
