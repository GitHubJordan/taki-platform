# Plano de Design UI/UX para TAKI 

## Objetivo de design

Criar uma experiência móvel emocional, social e gamificada que transforme cada corrida em *uma memória* — visual limpo, forte foco em conteúdo (vídeos/fotos), uso de gradientes, grande ênfase em progresso (barras/anel), badges e microfeedbacks que incentivem interações. Tudo alinhado com os módulos e endpoints do documento.&#x20;

---

## Mapa de telas (prioridade MVP)

Lista priorizada — comece por estas para validar produto:

1. Splash / Onboarding com slogan (“O seu destino é importante”) + login/registro (POST /auth/login, POST /users).&#x20;
2. Home / Feed (vídeos/rolagem estilo Reels) — GET /feed.&#x20;
3. Tela de Chamada de Corrida (mapa + opções de tipo, escolher destino/Taki Destinos) — POST /viagens.&#x20;
4. Tela de Viagem em Progresso (tempo, motorista, botão “Gravar Momento TAKI”) — POST /viagens/{id}/gerar-momento e upload de mídia.&#x20;
5. Tela de Final de Viagem / Gerar Momento (animação celebratória + opção postar) — PUT /viagens/{id}/concluir + POST /media/upload.&#x20;
6. Perfil do Usuário (linha do tempo, álbum de destinos, selo de nível) — GET /profiles/{user\_id}.&#x20;
7. Post Editor / Upload (caption, hashtags, marcar motorista, localização) — POST /posts e POST /media/upload.&#x20;
8. Gamificação / Wallet (TakiCoins, recompensas) — GET /gamificacao/recompensas, POST /gamificacao/pontos, POST /gamificacao/recompensas/resgatar.&#x20;
9. Taki Destinos (guia turístico) + lista de motoristas especializados — GET /destinos, GET /destinos/{id}/motoristas.&#x20;
10. Chat (motorista ↔ passageiro e comunidades) — POST /chat/{chat\_id}/mensagens.&#x20;
11. Tela motorista: painel de viagem, histórico, perfil motoristas (paralelo ao fluxo passageiro).&#x20;

> Observação: cada tela terá variações (estado vazio, carregando, erro, sucesso). As telas sociais (feed / perfil) merecem prioridade visual porque posicionam a TAKI como plataforma de memórias.

---

## Fluxos de usuário (resumido) — pontos-chave ligados ao backend

* **Autenticação → Home:** login (POST /auth/login) → recuperar perfil (GET /profiles/{id}) → carregar feed (GET /feed).&#x20;
* **Chamar corrida:** escolher destino → selecionar tipo (tema romântica/temática) → POST /viagens → tela viagem em progresso.&#x20;
* **Durante a viagem:** botão “Registrar Momento” chama câmera/record (client) → POST /media/upload → POST /viagens/{id}/gerar-momento inicia processamento para clipe automático.&#x20;
* **Finalizar:** PUT /viagens/{id}/concluir (avaliação + comentário) → opção postar clipe no feed (POST /posts).&#x20;
* **Gamificação:** ações disparam POST /gamificacao/pontos; resgates via POST /gamificacao/recompensas/resgatar.&#x20;

Esses fluxos definem claramente quais telas e estados precisam ser desenhados (e quais chamadas API devem estar atreladas a botões/ações).

---

# 1 — Extração rápida da identidade visual do logo

(Observação: cores aproximadas, calibráveis em Figma/Adobe a partir do SVG/PNG original.)

* Fundo escuro (navy profundo) — `#070B1A` (uso: tela principal, barras)
* Branco do logotipo / tipografia — `#FFFFFF`
* Magenta/roxo do ícone carro/pessoa — **Primário** `#B42ACF` (tom principal)
* Gradiente secundário (para CTAs/ações chamativas): `linear-gradient(135deg, #B42ACF 0%, #6D49FF 100%)`
* CTA alternativo / destaque quente: `#FF9A6B` (uso em alertas/ações primárias secundárias)
* Neutros: `#0F1724` (card bg), `#E6EEF8` (texto escuro sobre claro), `#94A3B8` (muted text)

Esses tokens criam contraste forte com o logo e remetem a uma imagem sofisticada e moderna.

---

# 2 — Tipografia & escala

(Recomendo uso web/mobile: **Poppins** ou **Inter** — Poppins para headlines dá ar moderno e amigável; Inter para textos longos.)

* Headline XL — Poppins Bold 34 / line-height 40
* H1 — Poppins Bold 28 / lh 36
* H2 — Poppins SemiBold 20 / lh 28
* Body — Inter Regular 16 / lh 22
* Small UI — Inter 12 / lh 16
* Botões grandes — Poppins SemiBold 16 (caps opcionais)

Spacing base: 8px grid. Margens: 16 / 24 / 32 como principais “gutters”.

---

# 3 — Tokens (JSON / CSS variables) — pronto para handoff

```css
:root{
  --bg-900: #070B1A;
  --bg-800: #0F1724;
  --text-100: #FFFFFF;
  --muted-300: #94A3B8;
  --primary-500: #B42ACF;
  --primary-700: #6D49FF;
  --primary-gradient: linear-gradient(135deg,#B42ACF,#6D49FF);
  --accent-warm: #FF9A6B;
  --success: #16A34A;
  --danger: #EF4444;
  --radius-lg: 16px;
  --radius-md: 8px;
  --shadow-soft: 0 6px 18px rgba(12, 14, 22, 0.45);
}
```

E JSON para tokens de design (exemplo):

```json
{
  "color": {
    "background": "#070B1A",
    "card": "#0F1724",
    "text": "#FFFFFF",
    "primary": "#B42ACF",
    "primary_end": "#6D49FF",
    "accent": "#FF9A6B"
  },
  "radius": {"lg": 16, "md": 8, "sm": 4},
  "spacing": {"xs": 8, "sm": 12, "md": 16, "lg": 24, "xl": 32}
}
```

---

# 4 — Versões do logo e regras de uso

* **Versão principal (wordmark + ícone)** sobre fundo escuro (use margem limpa = altura do “T”).
* **Versão invertida** (ícone/pessoa + carro em `#B42ACF` sobre branco) para aplicações claras.
* **Ícone somente** (apenas o símbolo carro+usuário) para app icon e favicons.
* **Clear space:** mínimo = 1x altura do “a” do logotipo em todos os lados.
* **Tamanhos mínimos:** wordmark em apps: 28px de altura; ícone para app icon: 1024px→export adapt.

---

# 5 — Componentes essenciais (UI Kit) — descrição + variantes

1. **Top Header** — avatar, nível (badge circular), ação “Chamar Taki” (CTA gradient)

   * Estados: normal / usuário offline / notificações.

2. **Bottom Nav** — 4 itens (Home/Buscar/Viagens/Perfil). Ícones lineares com estado ativo preenchido magenta.

   * Elevation leve; label opcional.

3. **Big CTA (Chamar Taki)** — botão circular + texto, colocado em bottom center;

4. **Card Feed (vídeo/post)** — thumbnail vertical, overlay play, ações (Curtir, Comentar, Compartilhar, Marcar Motorista), badge localização.

   * Variantes: video, image, momento (clip).

5. **Map + Bottom Sheet** — mapa (full screen) com bottom sheet para seleção destino/tipo de corrida.

   * Bottom sheet: sombra forte e curtin (border-radius top 16px).

6. **Player Modal** — full-screen vertical video player com comentários em overlay.

7. **Wallet / Gamification card** — ring progress + botão “resgatar” + lista recompensas.

8. **Upload component** — camera/record, progress bar, estado: uploading/processing/ready/error.

9. **Toast / Snackbars** — baixo centro, rounded 12px, 350–450ms duração.

---

# 6 — Telas prioritárias (wireframes + medidas e layout pronto para dev)

Vou descrever 6 telas-chave com layout e elementos para que o dev construa direto.

### A. Onboarding / Splash / Login

* Fundo: `--bg-900` com grade sutil.
* Logo central grande (altura 92px). Slogan abaixo: “O seu destino é aqui”.
* CTA: “Criar conta / Entrar com número” — botão full width com gradiente.
* Opção login com Google / Apple em ghost buttons.

### B. Home / Feed (estilo Reels)

* Full-screen cards swipable vertical.
* Header: avatar + pesquisa.
* Card: vídeo 100% height; overlay no canto inferior direito: botões sociais em coluna (like, comment, share) — use 56px circular icons com shadow.
* Bottom nav visível com CTA central flutante “Chamar Taki”.

### C. Chamada de Corrida (Map + Bottom Sheet)

* Mapa full-screen (Google / Mapbox). Marcador central “Você está aqui”.
* Bottom sheet (40% height por padrão, expansível) com: campo destino, opções tipo (Taki Standard / Taki Comfort / Taki Moment – cada uma com preço estimado e tempo), botão “Confirmar”.
* Ao confirmar → micro-morph do botão para card de status “Buscando motorista”.

### D. Viagem em Progresso

* Card motorista com foto circular, avaliação, ETA, e timeline da rota.
* Grande botão “Registrar Momento” (circular vermelho/gradiente).
* Barra de progresso na parte superior mostrando % de viagem (animação contínua).

### E. Fim de Viagem / Gerar Momento

* Modal celebratório (confete sutil), preview do clipe capturado, CTA “Publicar no Feed” + “Salvar privado”.
* Resumo da corrida (tempo, custo, avaliação de motorista).

### F. Perfil / Wallet / Gamificação

* Header com Ring progress (XP/TakiCoins) à esquerda e botão “Resgatar” à direita.
* Aba “Momentos” com grid de clipes/posts.
* Aba “Recompensas” listando itens resgatáveis.

Cada tela precisa de estados: vazio, carregando, erro, sucesso.

---

# 7 — Microinterações e motion

* Duração padrão: 180ms — 350ms.
* Easing: `cubic-bezier(.22,1,.36,1)` (ease-out-spring feel).
* Exemplos:

  * CTA morph (chamar → buscando): 300ms.
  * Progress ring fill: 800ms on level-up.
  * Confetti burst: 600ms.
  * Feed swipe: momentum-scroll nativo.

---

# 8 — Acessibilidade e internacionalização

* Contraste texto/papel mínimo 4.5:1.
* Elementos touch: mínimo 44x44dp.
* Labels para leitores de tela (aria-labels) em botões críticos.
* Strings isoladas para i18n (PT/EN – use keys: `home.cta.call`, `trip.finish.title`).

---

# 9 — Checklist rápido para integração com o back (o que o design deve mapear)

* Botão “Publicar” → chamar `POST /posts` + `POST /media/upload`.
* Upload → mostrar estados (uploading/processing/ready).
* Gerar Momento → endpoint assíncrono (`POST /viagens/{id}/gerar-momento`) → UI mostra processamento em background.
* Gamification actions → `POST /gamificacao/pontos` e `POST /gamificacao/recompensas/resgatar`.
