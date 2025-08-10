
# 🚀 Guia Rápido: Como Contribuir com o Projeto no GitHub

Este tutorial é para ajudar todos os membros da equipe a usarem o GitHub corretamente dentro do fluxo de trabalho definido para o projeto TAKI APP.

---

## ✅ Pré-requisitos

1. Ter o Git instalado no computador: [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Ter uma conta no GitHub: [https://github.com](https://github.com)
3. Ter o VSCode (ou outro editor de sua preferência) instalado
4. Ter acesso ao repositório do projeto (Jordan irá adicionar todos)

---

## 🧭 ETAPA 1: Clonar o repositório

```bash
git clone https://github.com/GitHubJordan/taki-platform.git
cd taki-platform
```

---

## 🌿 ETAPA 2: Criar sua branch (modo recomendado)

Crie uma nova branch com seu nome ou nome da tarefa:

```bash
git checkout -b feature/nome-da-tarefa
```

Exemplo:

```bash
git checkout -b feature/tela-login
```

---

## 🔧 ETAPA 3: Fazer alterações no código

Edite os arquivos conforme sua tarefa. Salve tudo antes de prosseguir.

---

## 💾 ETAPA 4: Adicionar, confirmar (commit) e subir (push)

```bash
git add .
git commit -m "feat: criar tela de login"
git push origin feature/tela-login
```

---

## 📥 ETAPA 5: Criar Pull Request

1. Vá até o repositório no GitHub
2. Clique em **Compare & Pull Request**
3. Escolha como base a branch `dev` e como compare a sua branch
4. Adicione um título e uma breve descrição
5. Clique em **Create Pull Request**

> Atenção: Abrir Pull Request para **`dev`**.

---

## 🔁 ETAPA 6: Puxar atualizações do projeto (mantê-lo atualizado)

Sempre que alguém fizer merge no `dev`, você deve atualizar seu código local:

```bash
git checkout dev
git pull origin dev
```

Se quiser continuar trabalhando na sua branch:

```bash
git checkout feature/tela-login
git merge dev
```

---

## 🛠️ ETAPA 7: Conectar-se a uma branch existente

Caso alguém já tenha criado uma branch e você precise continuar nela:

```bash
git fetch origin
git checkout nome-da-branch
```

Exemplo:

```bash
git checkout feature/api-login
```

---

## ❗ BOAS PRÁTICAS

- Nunca suba código diretamente na `main` ou `dev`
- Use nomes de branch claros: `feature/nome`, `fix/erro`, `hotfix/x`
- Faça commits pequenos e com mensagens claras
- Comunique no grupo sempre que abrir um Pull Request

---

Em caso de dúvidas, fale com Jordan Adelino.

Bom trabalho, equipe TakiDev's! 💪
