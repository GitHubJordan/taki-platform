# Fluxo de Trabalho Remoto - TAKI Team

## 🚀 Ciclo de Desenvolvimento (Sprint de 1 semana)

### 🔄 Fluxo Diário

[![](https://mermaid.ink/img/pako:eNpFkU1ug0AMha8y8pqkhJ8As6jUhHQXqWpRF4Us3I4LKDCDBoiaRjlNFz1ILtbJJFG9svW-Z1v2AT6UIOBQauwqlqWFZCYe8hTrZs9eBpRi7DZsMrlnizzT-I5NpZjEnmXYb_vNhV9YYJk_067uTz-KCWJPqOmmL62e5mvSJbEONbKUdlcxteIqz6gfqL97xaYWePo1ba7AygKPeUpdo-xSZS3LDThm61oAH_RIDrSkWzyXcDjbChgqaqkAblKBeltAIY_G06F8U6q92bQaywr4Jza9qcZO4EBpjeYe_whJQXqpRjkAjyLbAvgBvoD7cTj1Yj8MvHmSePE8DhzYA_eSqRckSRwk_izyfX92dODbDnWncRS6Jry5G0WuF84cIFEPSq8vj7D_OP4BVmp9qA?type=png)](https://mermaid.live/edit#pako:eNpFkU1ug0AMha8y8pqkhJ8As6jUhHQXqWpRF4Us3I4LKDCDBoiaRjlNFz1ILtbJJFG9svW-Z1v2AT6UIOBQauwqlqWFZCYe8hTrZs9eBpRi7DZsMrlnizzT-I5NpZjEnmXYb_vNhV9YYJk_067uTz-KCWJPqOmmL62e5mvSJbEONbKUdlcxteIqz6gfqL97xaYWePo1ba7AygKPeUpdo-xSZS3LDThm61oAH_RIDrSkWzyXcDjbChgqaqkAblKBeltAIY_G06F8U6q92bQaywr4Jza9qcZO4EBpjeYe_whJQXqpRjkAjyLbAvgBvoD7cTj1Yj8MvHmSePE8DhzYA_eSqRckSRwk_izyfX92dODbDnWncRS6Jry5G0WuF84cIFEPSq8vj7D_OP4BVmp9qA)

## 👥 Responsabilidades por Função

### 👤 **Jordan Adelino (Líder/Tech Lead)**

- [x] **Gestão do Repositório**:
  - Configurar proteção de branches (`main` e `dev`)
  - Definir templates para Issues e Pull Requests
  - Configurar CI/CD básico (GitHub Actions)
  
- [x] **GitHub Projects**:
  - Criar board com colunas: `Backlog`, `To Do`, `In Progress`, `Review`, `Done`
  - Associar milestones à sprint
  - Atribuir tasks aos membros

- [x] **Arquitetura Inicial**:
  - Definir estrutura de pastas frontend/backend
  - Criar `api-specs.md` com endpoints essenciais
  - Documentar decisões técnicas em `ARCHITECTURE.md`


### 🎨 **Artur Martinho (Frontend)**

- [ ] **Ambiente Frontend**:
  - Inicializar React Native
  - Configurar ESLint/Prettier com padrão TAKI
  - Adicionar dependências base (React Router, Axios)

- [ ] **Componentes Base**:
  - Criar sistema de autenticação UI:
    ```jsx
    // src/components/Auth/LoginForm.jsx
    export default function LoginForm({ onSubmit }) {
      // Validação, estados, etc...
    }
    ```
  - Desenvolver layout responsivo com Tailwind CSS
  - Implementar tratamento de erros na UI

- [ ] **Integração API**:
  - Service para autenticação (`src/services/auth.js`)
  - Gerenciamento de tokens com localStorage

### 🖥️ **Antóni Ngonga (Backend)**

- [ ] **Setup Backend**:
  - Inicializar Express.js/FastAPI
  - Configurar ORM (Sequelize/Prisma)
  - Conectar ao PostgreSQL local

- [ ] **Autenticação**:
  - Implementar modelo User:
    ```javascript
    // models/User.js
    {
      email: { type: String, unique: true },
      password: { type: String, select: false },
      tipo: { enum: ['passageiro', 'motorista'] }
    }
    ```
  - Criar endpoints:
    - `POST /auth/register` (validação de dados)
    - `POST /auth/login` (JWT generation)
    - `GET /auth/me` (protegido por middleware)

- [ ] **Documentação**:
  - Configurar Swagger/Postman
  - Testes unitários básicos com Jest

### 🔁 **Jordan Adelino (Fullstack Support)**

- [ ] **Ponte Frontend-Backend**:
  - Garantir compatibilidade entre contratos API
  - Criar arquivo `api-client.js` para frontend
  - Validar fluxo completo de autenticação

- [ ] **Automação**:
  - Docker compose para ambiente completo:
    ```yaml
    # docker-compose.dev.yml
    services:
      backend:
        build: ./backend
      frontend:
        build: ./frontend
      db:
        image: postgres:15
    ```
  - Script `init.sh` para setup inicial

- [ ] **Qualidade**:
  - Revisão de código em PRs
  - Testes manuais E2E
  - Configurar SonarCloud

### 🎨 **João Tavares (UI/UX)**
- [ ] **Design System**:
  - Definir palette de cores no Figma
  - Criar componentes base: botões, inputs, cards
  - Estabelecer guia de tipografia

- [ ] **Wireframes**:
  - Tela de Login/Registo (mobile)
  - Dashboard básico (após login)
  - Perfil de usuário (placeholder)

- [ ] **Prototipagem**:
  - Fluxo completo de autenticação
  - Responsividade cross-device
  - Export assets para desenvolvimento

### 🎨 **Ester Conceição (Auxiliar de Designer)**
- [ ] **Apoio ao Design System**:
  - Revisar componentes criados no Figma
  - Sugerir melhorias visuais para botões e inputs
  - Garantir consistência de cores e tipografia

- [ ] **Documentação Visual**:
  - Organizar assets exportados para o time de desenvolvimento
  - Atualizar guia de estilos conforme feedback dos membros

- [ ] **Wireframes & Prototipagem**:
  - Auxiliar na criação de telas secundárias (ex: recuperação de senha)
  - Validar responsividade dos protótipos em diferentes dispositivos

- [ ] **Comunicação**:
  - Participar das reuniões de alinhamento de UI/UX
  - Registrar decisões visuais importantes no repositório de design

## 📌 Regras de Trabalho

### 🔀 Fluxo Git

[![](https://mermaid.ink/img/pako:eNqNkkFvwjAMhf9K5HMHpQVKc920CWk7cpl6CY1pLZqkCiliQ_z3pS2MbXTTjk7e8_ec-Ai5kQgcCnJPVtRlphnLjVLkGEnOMlhqciSq82EGrWBthc5LJnHfyUvMt6Zxn3WvvOo2KFxjcSwaV95trNEOtbwBPZuCNFste8S3q0djFduLiqRwZPRZ8QOr0Bb4O2soy1rk26Eoqx1apvzDVANhxlUX1PtqQ9r9O8wX2CULHfor3wYL2892MzsdmDPeyUqhZUW6-JM40BICKCxJ4M42GIAXKtGWcGx9GbgSFWbQwqSw27b9yXtqoV-NURebNU1RAt-IauerpvZfgQ8kPOMq8eOhvTeNdsCni64F8CMcgEdhMkrDSZzOkiQOJ_NFFMAb8CQaRdM0TeZhFMdRPElOAbx30HC0SGYBoCRn7Eu_o92qnj4AIJbqMw?type=png)](https://mermaid.live/edit#pako:eNqNkkFvwjAMhf9K5HMHpQVKc920CWk7cpl6CY1pLZqkCiliQ_z3pS2MbXTTjk7e8_ec-Ai5kQgcCnJPVtRlphnLjVLkGEnOMlhqciSq82EGrWBthc5LJnHfyUvMt6Zxn3WvvOo2KFxjcSwaV95trNEOtbwBPZuCNFste8S3q0djFduLiqRwZPRZ8QOr0Bb4O2soy1rk26Eoqx1apvzDVANhxlUX1PtqQ9r9O8wX2CULHfor3wYL2892MzsdmDPeyUqhZUW6-JM40BICKCxJ4M42GIAXKtGWcGx9GbgSFWbQwqSw27b9yXtqoV-NURebNU1RAt-IauerpvZfgQ8kPOMq8eOhvTeNdsCni64F8CMcgEdhMkrDSZzOkiQOJ_NFFMAb8CQaRdM0TeZhFMdRPElOAbx30HC0SGYBoCRn7Eu_o92qnj4AIJbqMw)

**Regras:**
1. Sem commits diretos em `dev` ou `main`
2. Nomeclatura de branches:
   - `feature/nome-da-feature`
   - `fix/nome-do-fix`
   - `docs/nome-da-doc`
3. Pull Requests obrigatórios com:
   - Descrição da mudança
   - Screenshots (para frontend)
   - Link para issue relacionada

### 🧪 Critérios de Aceitação
Para cada task:
- [ ] Código revisado por pelo menos 1 colega
- [ ] Testes passando localmente
- [ ] Sem conflitos com `dev`
- [ ] Documentação atualizada
- [ ] Deploy bem sucedido no ambiente staging

## 📅 Cronograma Diário

| Dia       | Foco                          | Entregáveis Esperados                     |
|-----------|-------------------------------|-------------------------------------------|
| **Seg**   | Setup & Planeamento           | Repo configurado, tasks atribuídas        |
| **Ter**   | Desenvolvimento Core          | Modelos DB, UI base, autenticação backend |
| **Qua**   | Integração & Testes           | Fluxo auth completo funcionando           |
| **Qui**   | Refinamento & Documentação    | Fix bugs, docs, testes                    |
| **Sex**   | Revisão & Preparação Deploy   | Deploy staging, sprint review             |

## ✅ Definição de Pronto (DoD)

A sprint será considerada **bem-sucedida** quando:
- [ ] Usuários podem se registrar via frontend/backend
- [ ] Login gera token JWT válido
- [ ] Perfil básico do usuário é acessível após login
- [ ] Ambiente dockerizado funcional
- [ ] Documentação básica disponível
- [ ] Pipeline CI configurado (lint, build, test)

## 🛠️ Ferramentas Essenciais
- **Comunicação**: WhatsApp (por enquanto)
- **Gestão**: GitHub Projects + Issues
- **Design**: Figma (compartilhamento em tempo real)
- **Pair Programming**: VS Code Live Share
- **Monitoramento**: Sentry (erros frontend/backend)

> “A comunicação clara é o combustível do desenvolvimento remoto eficaz”
