# TAKI - Transformando Destinos em Histórias

> **"O Seu Destino É Importante"** - Plataforma de mobilidade que transforma cada viagem em uma experiência memorável.

![Backend CI](https://github.com/GitHubJordan/taki-platform/actions/workflows/backend-ci.yml/badge.svg)
![Frontend CI](https://github.com/GitHubJordan/taki-platform/actions/workflows/frontend-ci.yml/badge.svg)

## Visão do Projeto
A TAKI não é apenas um aplicativo de transporte, mas uma plataforma que integra:
- **Viagens personalizadas** com registro automático de momentos
- **Feed social** para compartilhar experiências
- **Gamificação** com sistema de pontos e recompensas
- **Guia turístico** integrado
- **Conexões humanas** através de histórias reais

## Funcionalidades Principais
- 📱 **Perfis Interativos** com linha do tempo de viagens
- 🎥 **Momentos TAKI** - Geração automática de vídeos das viagens
- 🏆 **Sistema de Gamificação** com TakiCoins e recompensas
- 🌍 **Taki Destinos** - Guia turístico integrado
- ❤️ **Eventos Especiais** - Celebre momentos importantes
- 💬 **Conexões TAKI** - Histórias que marcam

## Tecnologias
### Backend
- **Node.js** (Express)
- **PostgreSQL** (banco relacional)
- **Redis** (cache)
- **Mídia**: AWS S3, FFmpeg (transcodificação de vídeo)

### Frontend Mobile
- **React Native** (iOS e Android)
- **Expo** (desenvolvimento rápido)

### Infraestrutura
- **Docker** e **Docker Compose**
- **Kubernetes** (produção)
- **NGINX** (reverse proxy)

## Começando

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+
- Yarn ou npm

### Configuração do Ambiente de Desenvolvimento

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/GitHubJordan/taki-platform.git
   cd taki-platform