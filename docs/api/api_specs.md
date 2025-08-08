# Documentação de Endpoints da API TAKI

Abaixo apresento a documentação completa dos endpoints para a API TAKI, organizada por módulos funcionais e alinhada com os requisitos do projeto:

## 1. Autenticação e Usuários

### 1.1. Login
```http
POST /auth/login
```
Autentica usuários e motoristas  
**Request:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senhaSegura123",
  "tipo": "passageiro" // ou "motorista"
}
```
**Response (200):**
```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "eyJhbGci...",
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "nivel": "Explorador"
}
```

### 1.2. Registro de Novo Usuário
```http
POST /users
```
Cria novo perfil de usuário  
**Request:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "password": "senhaSegura123",
  "tipo": "passageiro",
  "biografia": "Viajante apaixonada por novas experiências!"
}
```

## 2. Perfis e Feed Social

### 2.1. Obter Perfil
```http
GET /profiles/{user_id}
```
**Response (200):**
```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Carlos Mendes",
  "foto_url": "https://cdn.taki.com/profiles/carlos.jpg",
  "capa_url": "https://cdn.taki.com/covers/carlos-cover.jpg",
  "biografia": "Embaixador TAKI em Luanda",
  "nivel": "Embaixador",
  "taki_coins": 1250,
  "total_viagens": 47
}
```

### 2.2. Atualizar Perfil
```http
PUT /profiles/{user_id}
```
**Request:**
```json
{
  "biografia": "Novo embaixador TAKI!",
  "foto_url": "https://cdn.taki.com/profiles/novo-carlos.jpg"
}
```

## 3. Gestão de Viagens

### 3.1. Iniciar Viagem
```http
POST /viagens
```
**Request:**
```json
{
  "usuario_id": "123e4567-e89b-12d3-a456-426614174000",
  "motorista_id": "456f7890-e89b-12d3-a456-426614174000",
  "destino_id": "789g0123-e89b-12d3-a456-426614174000",
  "tipo": "romantica" // opcional para viagens temáticas
}
```

### 3.2. Finalizar Viagem e Gerar Momento TAKI
```http
PUT /viagens/{viagem_id}/concluir
```
**Request:**
```json
{
  "avaliacao": 5,
  "comentario": "Motorista excelente e carro decorado!"
}
```

## 4. Mídia e Momentos TAKI

### 4.1. Upload de Mídia
```http
POST /media/upload
```
**Request (multipart/form-data):**
- `file`: Arquivo de mídia (foto/vídeo)
- `viagem_id`: ID da viagem associada
- `tipo`: "foto" ou "video"

**Response (201):**
```json
{
  "media_id": "135a246b-e89b-12d3-a456-426614174000",
  "url_cdn": "https://cdn.taki.com/videos/viagem-123.mp4",
  "thumb_url": "https://cdn.taki.com/thumbs/viagem-123.jpg"
}
```

### 4.2. Gerar Momento TAKI Automático
```http
POST /viagens/{viagem_id}/gerar-momento
```
Gera vídeo automático com trilha sonora  
**Response (202):**
```json
{
  "momento_id": "246e135f-e89b-12d3-a456-426614174000",
  "status": "processing"
}
```

## 5. Gamificação e Recompensas

### 5.1. Adicionar Pontos por Ação
```http
POST /gamificacao/pontos
```
**Request:**
```json
{
  "usuario_id": "123e4567-e89b-12d3-a456-426614174000",
  "acao": "postar_video", // Valores: viajar, postar_foto, avaliar_5_estrelas, etc.
  "detalhes": { "post_id": "789g0123-..." } // opcional
}
```

### 5.2. Resgatar Recompensa
```http
POST /gamificacao/recompensas/resgatar
```
**Request:**
```json
{
  "usuario_id": "123e4567-e89b-12d3-a456-426614174000",
  "recompensa_id": "357f246e-e89b-12d3-a456-426614174000"
}
```

### 5.3. Obter Recompensas Disponíveis
```http
GET /gamificacao/recompensas
```
**Response (200):**
```json
[
  {
    "recompensa_id": "357f246e-e89b-12d3-a456-426614174000",
    "nome": "Café grátis",
    "custo_pontos": 50,
    "tipo": "digital"
  },
  {
    "recompensa_id": "468g357f-e89b-12d3-a456-426614174000",
    "nome": "Corrida Temática Romântica",
    "custo_pontos": 300,
    "tipo": "experiencia"
  }
]
```

## 6. Feed Social e Interações

### 6.1. Criar Post
```http
POST /posts
```
**Request:**
```json
{
  "usuario_id": "123e4567-e89b-12d3-a456-426614174000",
  "conteudo": "Cheguei ao meu casamento com TAKI! #ChegueiComTAKI",
  "midias": [
    {"media_id": "135a246b-e89b-12d3-a456-426614174000", "tipo": "video"}
  ],
  "hashtags": ["#MinhaTaki", "#ViagemComHistória"],
  "local": "Miradouro da Lua",
  "motorista_id": "456f7890-e89b-12d3-a456-426614174000"
}
```

### 6.2. Obter Feed
```http
GET /feed?page=1&limit=10
```
**Response (200):**
```json
{
  "posts": [
    {
      "post_id": "579h0246-e89b-12d3-a456-426614174000",
      "usuario": { ... },
      "conteudo": "Hoje realizei um sonho...",
      "midias": [ ... ],
      "curtidas": 42,
      "comentarios": 5,
      "hashtags": ["#MeuDestinoTAKI"]
    }
  ],
  "total": 123,
  "page": 1
}
```

## 7. Taki Destinos (Guia Turístico)

### 7.1. Buscar Destinos
```http
GET /destinos?cidade=Luanda&tipo=cultural
```
**Response (200):**
```json
[
  {
    "destino_id": "680i1357-e89b-12d3-a456-426614174000",
    "nome": "Miradouro da Lua",
    "descricao": "Vista deslumbrante das formações rochosas lunares",
    "tipo": "cultural",
    "latitude": -8.9988,
    "longitude": 13.2576,
    "destaque": true
  }
]
```

### 7.2. Motoristas Especializados
```http
GET /destinos/{destino_id}/motoristas
```
**Response (200):**
```json
{
  "motoristas": [
    {
      "motorista_id": "791j2468-e89b-12d3-a456-426614174000",
      "nome": "Pedro Kiala",
      "avaliacao": 4.9,
      "tags": ["conhecedor", "história"],
      "viagens_tematicas": ["Romântica", "Gastronômica"]
    }
  ]
}
```

## 8. Eventos Especiais

### 8.1. Registrar Evento Especial
```http
POST /eventos-especiais
```
**Request:**
```json
{
  "usuario_id": "123e4567-e89b-12d3-a456-426614174000",
  "tipo": "casamento",
  "data": "2025-12-15T14:00:00Z",
  "kit_especial": "flores, playlist",
  "motorista_id": "456f7890-e89b-12d3-a456-426614174000"
}
```

## 9. Comunidades e Conexões

### 9.1. Criar Comunidade
```http
POST /comunidades
```
**Request:**
```json
{
  "nome": "TAKI Luanda",
  "descricao": "Comunidade de usuários TAKI em Luanda",
  "tipo": "cidade",
  "regiao": "Luanda"
}
```

### 9.2. Enviar Mensagem no Chat
```http
POST /chat/{chat_id}/mensagens
```
**Request:**
```json
{
  "remetente_id": "123e4567-e89b-12d3-a456-426614174000",
  "conteudo": "Alguém para compartilhar carona amanhã?",
  "tipo": "texto"
}
```

## 10. Back-office (Admin)

### 10.1. Gerenciar Conteúdo em Destaque
```http
PUT /admin/destaques
```
**Request:**
```json
{
  "tipo": "TAKI_TV",
  "conteudo_ids": ["802k3579-e89b-12d3-a456-426614174000", ...],
  "destaque_ate": "2025-08-15T23:59:59Z"
}
```

### 10.2. Relatório de Engajamento
```http
GET /admin/relatorios/engajamento?periodo=30d
```
**Response (200):**
```json
{
  "total_usuarios": 15432,
  "novos_usuarios": 423,
  "posts_criados": 3421,
  "pontos_distribuidos": 128765,
  "recompensas_resgatadas": 287,
  "top_hashtags": ["#ViagemComHistória", "#MeuDestinoTAKI"]
}
```

---

## Segurança e Autenticação
Todos os endpoints (exceto login e registro) requerem autenticação via Bearer Token:
```
Authorization: Bearer <access_token>
```

## Padrão de Respostas de Erro
- `400 Bad Request`: Dados inválidos na requisição
- `401 Unauthorized`: Token inválido ou expirado
- `403 Forbidden`: Acesso não autorizado
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Paginação
Endpoints que retornam listas utilizam parâmetros:
- `page`: Número da página (default: 1)
- `limit`: Itens por página (default: 10)

## Versionamento
API atual: `v1`  
Endpoint base: `https://api.taki.com/v1`
