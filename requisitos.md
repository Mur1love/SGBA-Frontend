# Documento de Requisitos de Software (DRS)
## Sistema de Gerenciamento de Cadastro de Bolsas e Auxílios da UPE (SGBA)

**Contexto Acadêmico:** Projeto da disciplina de Programação Web  
**Foco da Aplicação:** Backend robusto com Spring Boot + Frontend funcional básico  
**Instituição:** Universidade de Pernambuco (UPE) / Pró-Reitoria de Pós-Graduação, Pesquisa e Extensão (PROPG)

---

## 1. Visão Geral e Escopo

O **SGBA** é um sistema web voltado a centralizar, padronizar e automatizar o processo de inscrição, submissão de documentos e avaliação de bolsas acadêmicas e auxílios da UPE (ex.: PIBIC, PIBITI, Monitoria, PROEX, Auxílio Permanência, PAIP).

### 1.1 Objetivo
Eliminar processos manuais em papel e e-mails dispersos, permitindo que:
- O **Aluno** consulte editais, preencha seus dados de candidatura, gere automaticamente formulários em PDF padronizados, anexe comprovantes e acompanhe o andamento da sua submissão.
- O **Professor (Orientador)** seja referenciado formalmente nas candidaturas (`orientador_id` → `usuarios.id` com `funcao=PROFESSOR`), permitindo listar "minhas orientações" e ser notificado de decisões.
- O **Gerenciador (PROPG/Comissão)** publique programas e editais, avalie inscrições, valide documentos, emita pareceres (aprovado, indeferido, pendente) e exporte dados das seleções.

### 1.2 Delimitação de Escopo (Foco Acadêmico)
Para viabilizar a entrega no semestre sem complexidade excessiva de frontend:
- O frontend será simples e direto (páginas renderizadas com **Thymeleaf** ou interface simples em HTML/Bootstrap/Tailwind consumindo APIs REST).
- O foco central de avaliação técnica estará no **backend com Spring Boot**: autenticação/autorização (RBAC), validações com Bean Validation, modelagem relacional com JPA/Hibernate, upload/download de arquivos, geração dinâmica de documentos PDF, máquina de estados da submissão e exportação de relatórios.

---

## 2. Perfis de Usuário (Atores)

| Perfil | Identificador | Responsabilidades no Sistema |
| :--- | :--- | :--- |
| **Aluno** | `ROLE_ALUNO` | Consulta programas/editais; preenche candidaturas em etapas (wizard); gera PDF da inscrição; envia anexos; resolve pendências apontadas; consulta histórico, notificações e status das suas submissões. |
| **Professor (Orientador)** | `ROLE_PROFESSOR` | É vinculado como orientador de submissões (`submissoes.orientador_id`); consulta as candidaturas que orienta; recebe notificações de decisões. Não publica editais nem avalia submissões. |
| **Gerenciador** | `ROLE_GERENCIADOR` | Cadastra e gerencia programas de bolsas e editais (incluindo perguntas e exigências de documentos por edição); visualiza métricas no painel; analisa submissões de todos os alunos; valida documentos anexados; altera status das candidaturas com parecer motivado; exporta relatórios (CSV). |

> **Regra Fundamental de Permissão:** Um aluno **nunca** pode alterar o status de uma submissão, visualizar submissões de outros alunos ou publicar editais. Somente usuários com `funcao=PROFESSOR` podem ser vinculados como `orientador_id` de uma submissão.

---

## 3. Requisitos Funcionais (RF)

### 3.1 Módulo: Autenticação e Gestão de Usuários
- **[RF01] Autenticação com Perfil Institucional:** Permitir login utilizando e-mail institucional (`@upe.br`) e senha, identificando automaticamente o perfil (`ROLE_ALUNO`, `ROLE_PROFESSOR` ou `ROLE_GERENCIADOR`).
- **[RF02] Manutenção de Dados de Perfil (CRUD Perfil):**
  - O Aluno possui perfil estendido em `alunos` (1:1 com `usuarios`): Nome, CPF, RG, Data de Nascimento, Nacionalidade, Gênero (`FEMININO`, `MASCULINO`, `OUTRO`, `PREFIRO_NAO_INFORMAR`), Telefone, Matrícula, Curso, Período Atual, CRA Atual, Unidade Acadêmica (ex.: POLI, FCAP, etc.), Semestre de Ingresso (ex.: `2023.1`) e Endereço (Logradouro, Número, Complemento, Bairro, Cidade, UF, CEP).
  - `usuarios` guarda apenas identidade/autenticação (Nome, E-mail, Senha, Função). Dados acadêmicos/pessoais ficam em `alunos`, evitando colunas nulas para Gerenciador/Professor.
  - O Gerenciador pode visualizar seus dados cadastrais vinculados ao setor (ex.: PROPG/UPE).

---

### 3.2 Módulo: Gestão de Programas e Editais (Visão Gerenciador & Consulta Aluno)
- **[RF03] CRUD de Programas de Bolsas (Gerenciador):**
  - Cadastrar, listar, editar e desativar programas de bolsa e auxílio.
  - Atributos: Título, Categoria (Iniciação Científica, Monitoria, Extensão, Auxílio, Apoio à Pesquisa), Descrição, Valor Mensal (R$), Quantidade de Vagas, Período Letivo (ex.: 2025.1), Data de Abertura, Data Limite de Inscrição e Status do Programa (Aberto, Em breve, Encerrado).
  - `status` é controle manual do gerenciador; `data_abertura`/`data_limite` são a regra dura de visibilidade (`ABERTO = now() BETWEEN data_abertura/data_limite`). O prazo efetivo de envio de cada edição fica em `editais.data_inicio/fim_submissoes` (RN05).
- **[RF04] Gestão de Editais e Arquivos (Gerenciador):**
  - Cadastrar editais vinculados a programas, com número do edital, ano, data de publicação e **janela de submissões da edição** (`data_inicio_submissoes`, `data_fim_submissoes`).
  - Fazer upload do arquivo oficial do edital em PDF.
  - Cadastrar por edição o **formulário dinâmico**: `perguntas_edital` (Enunciado, Obrigatória, Ordem de Exibição, com `UNIQUE(edital_id, ordem_exibicao)`) e as **exigências de documentos**: `exigencias_edital` (Tipo de Documento, Obrigatório, com `UNIQUE(edital_id, tipo_documento)`).
  - O envio da submissão valida na aplicação: `perguntas_edital.obrigatoria × respostas_submissao` e `exigencias_edital.obrigatorio × documentos_anexo` (RN12).
- **[RF05] Catálogo de Bolsas e Editais (Visão Aluno):**
  - Listagem dos programas abertos com filtros por categoria (Iniciação Científica, Monitoria, Extensão, etc.) e busca textual.
  - Visualização de cards informativos e botão para download/leitura direta do PDF do edital.
  - Exibir a janela de submissões da edição (`editais.data_inicio/fim_submissoes`); fora da janela o botão de candidatura fica desabilitado (RN05).
- **[RF06] Guia de Candidatura Integrado:**
  - Disponibilização de orientações passo a passo para o aluno entender os requisitos e instruções de preenchimento dos formulários.

---

### 3.3 Módulo: Candidatura e Inscrição (Visão Aluno)
- **[RF07] Formulário de Candidatura em Etapas (Wizard):**
  - O aluno se inscreve em um **edital aberto** (candidatura concorre a uma edição — `submissoes.edital_id` —; o programa é obtido via `editais.programa_id`) através de etapas organizadas:
    1. **Dados Pessoais:** Nome completo, CPF, RG, data de nascimento, nacionalidade, gênero, telefone e endereço (carregados do perfil `alunos`, editáveis antes do envio).
    2. **Dados Acadêmicos:** Matrícula, curso, período atual, CRA declarado, unidade acadêmica, semestre de ingresso e **orientador (seleção de usuário com `funcao=PROFESSOR` via `orientador_id`)** — não mais nome/e-mail livres.
    3. **Projeto / Plano de Trabalho:** Título do projeto (`titulo_projeto`), resumo da proposta (`projeto_resumo`), texto do plano de trabalho (`plano_trabalho`) **+ respostas às perguntas específicas do edital** (`respostas_submissao` ↔ `perguntas_edital`, com `UNIQUE(submissao_id, pergunta_id)`).
    4. **Documentos Obrigatórios:** Upload dos arquivos exigidos **pelo edital** (`exigencias_edital`), tipados por `tipo_documento` (`HISTORICO_ESCOLAR`, `COMPROVANTE_MATRICULA`, `CARTA_INTENCAO`, `PLANO_TRABALHO`, `OUTRO`; quando `OUTRO`, `descricao_personalizada` é obrigatória).
    5. **Revisão e Envio:** Conferência final e aceite do termo de veracidade (`termo_aceite`). No envio (`RASCUNHO → RECEBIDA`, em transação): congela snapshot `curso/periodo/cra/unidade_momento` a partir de `alunos`, seta `data_envio`, cria `historicos_status(RECEBIDA)` e atualiza `submissoes.status` (RN09).
- **[RF08] Salvamento de Rascunho:** Permitir que o aluno salve a candidatura parcialmente preenchida como `RASCUNHO` para retomar depois. Vale `UNIQUE(aluno_id, edital_id)` (`uk_aluno_edital`): bloqueia duplicata na mesma edição (inclusive contra `POST` concorrente) e permite recandidatura em edições futuras do mesmo programa (RN08).
- **[RF09] Upload de Documentos Comprobatórios:**
  - Permitir upload de múltiplos arquivos PDF (ex.: Histórico escolar atualizado, Comprovante de matrícula, Carta de intenção assinada, Plano de trabalho, Outro com descrição personalizada).
  - Validação de tamanho máximo (ex.: até 5MB por arquivo) e tipo MIME (`application/pdf`).
- **[RF10] Geração Automática de Formulário em PDF *(Além do CRUD)*:**
  - O sistema gera automaticamente em tempo de execução um documento PDF padronizado com os dados consolidados do formulário preenchido pelo aluno (incluindo **snapshot `*_momento`**, respostas às perguntas do edital e orientador).
  - Permitir que o aluno e o gerenciador façam download ou impressão direta desse formulário gerado.

---

### 3.4 Módulo: Acompanhamento e Resolução de Pendências (Visão Aluno)
- **[RF11] Painel "Minhas Submissões":**
  - Listar candidaturas do aluno com número de protocolo (ex.: `#2025-0142`), edital (e programa via edital), data de envio, quantidade de documentos e status atual (abas: Todas, Em análise, Pendentes, Aprovadas, Indeferidas).
  - Exibir badge de notificações não lidas (`notificacoes WHERE destinatario_id = ? AND lida_em IS NULL`) com deep-link pela `submissao_id`.
- **[RF12] Visualização da Linha do Tempo da Candidatura:**
  - Exibir o histórico cronológico de eventos da submissão a partir de `historicos_status` (ex.: "Enviada pelo aluno", "Recebida pela PROPG", "Pendência documental apontada"), com autor, data/hora e observação. `historicos_status` é append-only (sem `UPDATE`/`DELETE`) e fonte da verdade histórica; `submissoes.status` é cache do último evento para listagens rápidas.
- **[RF13] Resolução de Pendência de Documentos:**
  - Caso o status seja `PENDENTE_DOCUMENTOS`, o aluno tem a ação "Resolver pendência" habilitada para substituir ou reenviar apenas os arquivos com problemas apontados pela comissão (`documentos_anexo.observacao_validacao` + `notificacoes.submissao_id`).

---

### 3.5 Módulo: Avaliação e Gestão de Submissões (Visão Gerenciador)
- **[RF14] Painel Geral de Submissões Recebidas:**
  - Visualizar métricas quantitativas (Total Recebidas, Em Análise com prazo, Aprovadas, Indeferidas).
  - Tabela geral de submissões com paginação, filtro por programa **e por edital**, filtro por status e busca por nome do aluno ou número de protocolo.
- **[RF15] Tela de Avaliação Detalhada de Submissão:**
  - Exibir ficha do aluno com **valores do momento da candidatura** (`curso/periodo/cra/unidade_momento` — snapshot congelado no envio) + dados atuais, matrícula e e-mail; exibir orientador vinculado (`orientador_id`).
  - Exibir respostas às perguntas do edital (`respostas_submissao`).
  - Visualizar/baixar o formulário gerado automaticamente.
  - Listar documentos anexados com opção de marcar visualmente validade (`PENDENTE`, `VALIDO`, `VENCIDO`, `INCOMPLETO`).
- **[RF16] Workflow e Atualização de Status da Submissão *(Além do CRUD)*:**
  - O gerenciador pode alterar o status da submissão conforme a máquina de estados:
    - `EM_ANALISE`
    - `PENDENTE_DOCUMENTOS` (obriga inclusão de justificativa detalhada)
    - `APROVADA`
    - `INDEFERIDA` (obriga inclusão de motivo da recusa)
  - Opção de salvar rascunho da avaliação antes de publicar a decisão.
  - Toda decisão é escrita em transação: `INSERT historicos_status + UPDATE submissoes.status + INSERT notificacoes` (RN07).
- **[RF17] Notificação e Feedback ao Aluno:**
  - Ao publicar uma decisão que exija ação ou resultado final, o sistema registra a mensagem/motivo na timeline (`historicos_status.observacao`) **e cria `notificacoes` (destinatário, `submissao_id` opcional para deep-link, mensagem, `lida_em`, `criado_em`)**.
  - O aluno consulta a inbox (`GET /api/notificacoes?somenteNaoLidas=true`) e marca como lida (`PATCH /api/notificacoes/{id}/lida`). Não depende só de e-mail/polling.
- **[RF18] Exportação de Dados em CSV *(Além do CRUD)*:**
  - Endpoint no backend que gera arquivo CSV formatado com a lista de submissões filtradas (Protocolo, Nome, Matrícula, Curso (momento), CRA (momento), Período (momento), Programa, Edital (número/ano), Orientador, Status, Data de Envio).

---

## 4. Requisitos Não Funcionais (RNF)

| Identificador | Categoria | Descrição |
| :--- | :--- | :--- |
| **RNF01** | **Linguagem & Framework** | Backend desenvolvido em **Java 17+** utilizando **Spring Boot 3.x**. |
| **RNF02** | **Arquitetura** | Arquitetura em camadas bem definidas: `Controller` (REST / Web), `Service` (regras de negócio), `Repository` (Spring Data JPA), `DTO` (transferência de dados) e `Entity` (persistência). |
| **RNF03** | **Segurança & RBAC** | Controle de acesso via **Spring Security** com proteção baseada em papéis (`ROLE_ALUNO`, `ROLE_PROFESSOR`, `ROLE_GERENCIADOR`) nas rotas e nos métodos (`@PreAuthorize`). |
| **RNF04** | **Banco de Dados** | Banco de dados relacional (PostgreSQL ou MySQL; H2 para ambiente de desenvolvimento/testes locais). |
| **RNF05** | **Geração de PDF** | Utilização de biblioteca Java no backend (ex.: OpenPDF, iText ou Thymeleaf + Flying Saucer) para renderização do formulário de inscrição em formato PDF. |
| **RNF06** | **Armazenamento de Arquivos** | Armazenamento de anexos e editais em disco local configurável ou bucket simulado, salvando metadados e caminho relativo no banco de dados. |
| **RNF07** | **Tratamento de Exceções** | Tratamento centralizado com `@ControllerAdvice` / `@ExceptionHandler`, retornando respostas HTTP semânticas (400, 403, 404, 422). |
| **RNF08** | **Frontend Simples** | Interface leve (Thymeleaf com templates reutilizáveis ou HTML/Bootstrap simples) com foco exclusivo em viabilizar a interação com os endpoints do backend. |

---

## 5. Regras de Negócio (RN)

- **[RN01] Domínio de E-mail Obrigatório:** Usuários só podem ser registrados se utilizarem e-mail institucional no padrão `@upe.br`.
- **[RN02] Geração de Protocolo Único:** Toda submissão enviada deve receber um protocolo sequencial anual automático, no formato `#AAAA-XXXX` (ex.: `#2025-0163`).
- **[RN03] Inalterabilidade de Candidaturas pelo Aluno:** Após o envio definitivo (status diferente de `RASCUNHO` ou `PENDENTE_DOCUMENTOS`), o aluno não pode mais editar dados nem remover documentos.
- **[RN04] Justificativa Obrigatória:** O gerenciador não pode alterar o status para `PENDENTE_DOCUMENTOS` ou `INDEFERIDA` sem registrar textualmente o motivo/parecer.
- **[RN05] Prazo Limite de Envio:** O sistema não deve aceitar novas candidaturas (`RASCUNHO → RECEBIDA`) fora da janela `now() BETWEEN editais.data_inicio_submissoes AND editais.data_fim_submissoes`. `programas_bolsa.data_abertura/data_limite` controlam visibilidade geral; o prazo efetivo é o da edição.
- **[RN06] Isolamento de Dados do Aluno:** O aluno só pode visualizar as candidaturas associadas ao seu próprio identificador de usuário.
- **[RN07] Auditoria de Status (Timeline):** Toda mudança de status deve criar um registro imutável no histórico, contendo: status anterior, novo status, data/hora, autor da alteração e observação. `historicos_status` é append-only (nunca `UPDATE`/`DELETE`); `submissoes.status` é cache do último evento, atualizado na mesma transação (`INSERT histórico + UPDATE status`).
- **[RN08] Unicidade por Edição:** Um aluno pode ter apenas uma submissão por edital (`UNIQUE(aluno_id, edital_id)`). Recandidatura ao mesmo programa em edição futura é permitida.
- **[RN09] Snapshot de Mérito:** No envio, o sistema congela `alunos.curso/periodo_atual/cra_atual/unidade_academica → submissoes.curso/periodo/cra/unidade_momento`. Atualizações posteriores do perfil não alteram candidaturas já enviadas.
- **[RN10] Orientador Válido:** `submissoes.orientador_id`, quando informado, deve referenciar `usuarios.id` com `funcao=PROFESSOR` (validação na aplicação).
- **[RN11] Documento `OUTRO`:** Quando `documentos_anexo.tipo_documento = OUTRO`, `descricao_personalizada` é obrigatória (Bean Validation).
- **[RN12] Completude do Envio:** O envio (`RASCUNHO → RECEBIDA`) exige: `termo_aceite = true`, todas as `perguntas_edital.obrigatoria` respondidas e todos os `exigencias_edital.obrigatorio` com anexo correspondente.

---

## 6. Diferenciais do Projeto (Além do CRUD Simples)

Para demonstrar proficiência em Programação Web com Spring Boot sem complexidade desnecessária:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           ALÉM DO CRUD BÁSICO                           │
├────────────────────────────────┬────────────────────────────────────────┤
│ 1. Geração Dinâmica de PDF     │ Compilação de dados do aluno em doc    │
│                                │ PDF oficial para assinatura/impressão. │
├────────────────────────────────┼────────────────────────────────────────┤
│ 2. Workflow / State Machine    │ Máquina de estados com regras de       │
│                                │ transição e histórico auditável.       │
├────────────────────────────────┼────────────────────────────────────────┤
│ 3. Upload & Streaming de Docs  │ Validação de tipo MIME/tamanho e envio │
│                                │ seguro de arquivos multipart.          │
├────────────────────────────────┼────────────────────────────────────────┤
│ 4. Controle de Acesso (RBAC)   │ Regras estritas entre Aluno, Professor │
│                                │ e Gerenciador via Spring Security.     │
├────────────────────────────────┼────────────────────────────────────────┤
│ 5. Exportação para CSV         │ Geração sob demanda de planilha com    │
│                                │ submissões e métricas filtradas.       │
└────────────────────────────────┴────────────────────────────────────────┘
```

---

## 7. Modelo de Entidades e Relacionamentos (Conceitual)

> Espelha `docs/der.dbml` v2 (pós-feedback). Fonte normativa: DBML; o diagrama abaixo é visão simplificada.

```mermaid
erDiagram
    USUARIO ||--|| ALUNO : possui
    USUARIO ||--o{ SUBMISSAO : orienta
    ALUNO ||--o{ SUBMISSAO : realiza
    PROGRAMA_BOLSA ||--o{ EDITAL : possui
    EDITAL ||--o{ SUBMISSAO : recebe
    EDITAL ||--o{ PERGUNTA_EDITAL : define
    EDITAL ||--o{ EXIGENCIA_EDITAL : exige
    SUBMISSAO ||--o{ RESPOSTA_SUBMISSAO : possui
    PERGUNTA_EDITAL ||--o{ RESPOSTA_SUBMISSAO : respondida-por
    SUBMISSAO ||--o{ DOCUMENTO_ANEXO : contem
    SUBMISSAO ||--o{ HISTORICO_STATUS : registra
    SUBMISSAO ||--o{ NOTIFICACAO : gera
    USUARIO {
        Long id PK
        string nome
        string email
        string senha
        string funcao "ALUNO, PROFESSOR, GERENCIADOR"
    }
    ALUNO {
        Long usuarioId PK_FK
        string cpf UK
        string rg
        date dataNascimento
        string nacionalidade
        string genero
        string telefone
        string matricula UK
        string curso
        int periodoAtual
        decimal craAtual
        string unidadeAcademica
        string semestreIngresso
        string endereco "logradouro, numero, complemento, bairro, cidade, uf, cep"
    }
    PROGRAMA_BOLSA {
        Long id PK
        string titulo
        string categoria
        string descricao
        decimal valorMensal
        int vagas
        string periodoLetivo
        datetime dataAbertura
        datetime dataLimite
        string status "ABERTO, EM_BREVE, ENCERRADO"
    }
    EDITAL {
        Long id PK
        string numeroEdital
        int ano
        date dataPublicacao
        datetime dataInicioSubmissoes
        datetime dataFimSubmissoes
        string caminhoArquivoPdf
        Long programaId FK
    }
    PERGUNTA_EDITAL {
        Long id PK
        Long editalId FK
        string enunciado
        boolean obrigatoria
        int ordemExibicao
    }
    EXIGENCIA_EDITAL {
        Long id PK
        Long editalId FK
        string tipoDocumento
        boolean obrigatorio
    }
    SUBMISSAO {
        Long id PK
        string protocolo UK
        string status "RASCUNHO, RECEBIDA, EM_ANALISE, PENDENTE_DOCUMENTOS, APROVADA, INDEFERIDA"
        string tituloProjeto
        string projetoResumo
        string planoTrabalho
        boolean termoAceite
        datetime dataEnvio
        Long alunoId FK
        Long editalId FK
        Long orientadorId FK "-> USUARIO PROFESSOR"
        string cursoMomento "snapshot"
        int periodoMomento "snapshot"
        decimal craMomento "snapshot"
        string unidadeMomento "snapshot"
    }
    RESPOSTA_SUBMISSAO {
        Long id PK
        Long submissaoId FK
        Long perguntaId FK
        string respostaTexto
    }
    DOCUMENTO_ANEXO {
        Long id PK
        string tipoDocumento "HISTORICO_ESCOLAR, COMPROVANTE_MATRICULA, CARTA_INTENCAO, PLANO_TRABALHO, OUTRO"
        string descricaoPersonalizada "obrigatoria se OUTRO"
        string nomeOriginal
        string caminhoArquivo
        bigint tamanhoBytes
        string mimeType
        string statusValidacao "PENDENTE, VALIDO, VENCIDO, INCOMPLETO"
        string observacaoValidacao
        Long submissaoId FK
    }
    HISTORICO_STATUS {
        Long id PK
        string statusAnterior
        string statusNovo
        string observacao
        datetime dataHora
        Long submissaoId FK
        Long usuarioId FK
    }
    NOTIFICACAO {
        Long id PK
        Long destinatarioId FK
        Long submissaoId FK "opcional"
        string mensagem
        datetime lidaEm
        datetime criadoEm
    }
```

---

## 8. Mapeamento de Telas vs. Endpoints Sugeridos

| Tela (PDF de Referência) | Ator Principal | Funcionalidade Principal | Exemplo de Endpoint Spring Boot |
| :--- | :--- | :--- | :--- |
| **Página 6 - Login** | Ambos | Autenticação por perfil | `POST /api/auth/login` |
| **Página 5 - Programas & Editais** | Aluno | Catálogo e download de editais | `GET /api/programas/abertos`<br>`GET /api/editais/{id}/download` |
| **Página 4 - Candidatura (Wizard)** | Aluno | Salvar rascunho / submeter dados | `POST /api/submissoes/rascunho`<br>`POST /api/submissoes/enviar` |
| **Página 4/2 - PDF do Formulário** | Aluno / Gerenciador | Download do PDF gerado | `GET /api/submissoes/{id}/formulario-pdf` |
| **Página 3 - Minhas Submissões** | Aluno | Listar e ver timeline pessoal | `GET /api/submissoes/minhas`<br>`GET /api/submissoes/{id}/historico` |
| **Página 3 - Resolver Pendência** | Aluno | Reenviar anexo solicitado | `POST /api/submissoes/{id}/documentos/reenviar` |
| **Página 1 - Submissões Recebidas** | Gerenciador | Painel com filtros e métricas | `GET /api/gerenciador/submissoes`<br>`GET /api/gerenciador/metricas` |
| **Página 1 - Exportar CSV** | Gerenciador | Baixar relatório consolidado | `GET /api/gerenciador/submissoes/exportar-csv` |
| **Página 2 - Avaliar Submissão** | Gerenciador | Alterar status e emitir parecer | `PUT /api/gerenciador/submissoes/{id}/decisao` |
| **Página 2 - Validar Anexo** | Gerenciador | Download e validação de documento | `GET /api/documentos/{id}/download`<br>`PATCH /api/documentos/{id}/status` |
| **Cadastro de Edital (perguntas/exigências)** | Gerenciador | Definir formulário dinâmico por edição | `POST /api/editais/{id}/perguntas`<br>`POST /api/editais/{id}/exigencias` |
| **Candidatura (wizard dinâmico)** | Aluno | Listar perguntas/exigências do edital | `GET /api/editais/{id}/perguntas`<br>`GET /api/editais/{id}/exigencias` |
| **Notificações (sino/badge)** | Aluno / Professor | Listar inbox e marcar como lida | `GET /api/notificacoes?somenteNaoLidas=true`<br>`PATCH /api/notificacoes/{id}/lida` |
| **Minhas Orientações** | Professor | Listar submissões orientadas | `GET /api/professor/orientacoes` |
