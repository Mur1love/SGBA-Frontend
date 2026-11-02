# SGBA — Frontend

Frontend do **SGBA (Sistema de Gerenciamento de Cadastro de Bolsas e Auxílios da UPE)**.

> 🔗 Repositório do backend: https://github.com/DaviidCarvallho/Sistema-de-Gerenciamento-de-Cadastro-de-Bolsas-e-Auxlios-da-UPE

## Stack

- [Vite](https://vitejs.dev/) 7
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5.8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Router](https://reactrouter.com/) 7

## Estrutura

```
.
├── frontend/        # Aplicação (Vite + React + TS)
├── docs/            # Documentação (DER, decisões e mudanças)
└── requisitos.md    # Requisitos do sistema
```

## Como rodar

```bash
cd frontend
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção (tsc -b && vite build)
npm run preview   # pré-visualizar o build
```
