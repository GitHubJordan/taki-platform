Aqui estão os modelos (tabelas) completos para o aplicativo TAKI, seguindo o DER proposto e as funcionalidades descritas:

```sql
-- Tabela base de usuários (passageiros e motoristas)
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('passageiro', 'motorista')),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMPTZ,
    telefone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'suspenso'))
);

-- Perfis dos usuários
CREATE TABLE perfil (
    usuario_id UUID PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    nome_completo VARCHAR(255) NOT NULL,
    foto_url VARCHAR(255),
    capa_url VARCHAR(255),
    biografia TEXT,
    nivel VARCHAR(50) DEFAULT 'Explorador' CHECK (nivel IN ('Explorador', 'Viajante Social', 'Influenciador Local', 'VIP TAKI', 'Embaixador TAKI')),
    total_viagens INT DEFAULT 0,
    total_pontos INT DEFAULT 0
);

-- Destinos turísticos
CREATE TABLE destino (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('cultural', 'historico', 'moderno', 'praia', 'miradouro', 'parque', 'gastronomico')),
    cidade VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    destaque BOOLEAN DEFAULT false,
    tags VARCHAR(255)[]
);

-- Registro de viagens
CREATE TABLE viagem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    motorista_id UUID REFERENCES usuario(id) ON DELETE SET NULL,
    destino_id UUID REFERENCES destino(id) ON DELETE SET NULL,
    data_inicio TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    data_fim TIMESTAMPTZ,
    avaliacao SMALLINT CHECK (avaliacao BETWEEN 1 AND 5),
    comentario TEXT,
    tipo_viagem VARCHAR(50) CHECK (tipo_viagem IN ('romantica', 'noturna', 'gastronomica', 'turistica', 'evento')),
    distancia DECIMAL(8,2),
    custo DECIMAL(8,2)
);

-- Momentos TAKI (vídeos automáticos)
CREATE TABLE momento_taki (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    viagem_id UUID NOT NULL REFERENCES viagem(id) ON DELETE CASCADE,
    video_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    duracao SMALLINT,
    status VARCHAR(20) DEFAULT 'processando' CHECK (status IN ('processando', 'disponivel', 'falha')),
    data_geracao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Posts no feed social
CREATE TABLE post (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    viagem_id UUID REFERENCES viagem(id) ON DELETE SET NULL,
    conteudo TEXT,
    data_post TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(255),
    tipo_post VARCHAR(20) CHECK (tipo_post IN ('texto', 'foto', 'video', 'story')),
    curtidas INT DEFAULT 0,
    comentarios INT DEFAULT 0
);

-- Mídias (fotos/vídeos)
CREATE TABLE midia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES post(id) ON DELETE CASCADE,
    url_cdn VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('foto', 'video')),
    descricao TEXT,
    largura SMALLINT,
    altura SMALLINT
);

-- Hashtags para organização
CREATE TABLE hashtag (
    id SERIAL PRIMARY KEY,
    tag VARCHAR(50) UNIQUE NOT NULL,
    contador_uso INT DEFAULT 0,
    data_primeiro_uso TIMESTAMPTZ
);

-- Relação post-hashtag (N-N)
CREATE TABLE post_hashtag (
    post_id UUID NOT NULL REFERENCES post(id) ON DELETE CASCADE,
    hashtag_id INT NOT NULL REFERENCES hashtag(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, hashtag_id)
);

-- Sistema de pontos (TakiCoins)
CREATE TABLE takicoin (
    usuario_id UUID PRIMARY KEY REFERENCES usuario(id) ON DELETE CASCADE,
    saldo INT DEFAULT 0,
    data_atualizacao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Transações de pontos
CREATE TABLE transacao_takicoin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    valor INT NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ganho', 'resgate')),
    descricao TEXT NOT NULL,
    data TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    relacionamento_id UUID -- ID relacionado (viagem, post, etc)
);

-- Recompensas disponíveis
CREATE TABLE recompensa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    custo_pontos INT NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('digital', 'fisica', 'experiencia')),
    estoque INT, -- NULL para ilimitadas
    valido_ate DATE
);

-- Eventos especiais
CREATE TABLE evento_especial (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('casamento', 'formatura', 'emprego', 'aniversario', 'outro')),
    data_evento DATE NOT NULL,
    kit_especial VARCHAR(255),
    descricao TEXT,
    publico BOOLEAN DEFAULT false
);

-- Viagens temáticas
CREATE TABLE viagem_tematica (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    motorista_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    tema VARCHAR(100) NOT NULL,
    descricao TEXT,
    elementos VARCHAR(255)[] -- [luzes, musica, decoracao, etc]
);

-- Comunidades/grupos
CREATE TABLE comunidade (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('cidade', 'bairro', 'interesse', 'universitario')),
    regiao VARCHAR(100),
    criador_id UUID NOT NULL REFERENCES usuario(id) ON DELETE SET NULL
);

-- Membros de comunidades
CREATE TABLE membro_comunidade (
    comunidade_id UUID NOT NULL REFERENCES comunidade(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    data_ingresso TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    cargo VARCHAR(20) DEFAULT 'membro' CHECK (cargo IN ('membro', 'moderador', 'admin')),
    PRIMARY KEY (comunidade_id, usuario_id)
);

-- Sistema de chat
CREATE TABLE conversa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('privada', 'grupo', 'comunidade')),
    titulo VARCHAR(100),
    comunidade_id UUID REFERENCES comunidade(id) ON DELETE CASCADE,
    data_criacao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Participantes do chat
CREATE TABLE participante_conversa (
    conversa_id UUID NOT NULL REFERENCES conversa(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    data_entrada TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conversa_id, usuario_id)
);

-- Mensagens
CREATE TABLE mensagem (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversa_id UUID NOT NULL REFERENCES conversa(id) ON DELETE CASCADE,
    remetente_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    tipo VARCHAR(20) DEFAULT 'texto' CHECK (tipo IN ('texto', 'foto', 'video', 'audio', 'localizacao')),
    data_envio TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT false
);

-- Histórias inspiradoras (TAKI TV)
CREATE TABLE historia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('formatura', 'casamento', 'emprego', 'amor', 'superacao')),
    destaque BOOLEAN DEFAULT false,
    data_publicacao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    visualizacoes INT DEFAULT 0
);

-- Mídias para histórias
CREATE TABLE historia_midia (
    historia_id UUID NOT NULL REFERENCES historia(id) ON DELETE CASCADE,
    midia_id UUID NOT NULL REFERENCES midia(id) ON DELETE CASCADE,
    ordem SMALLINT,
    PRIMARY KEY (historia_id, midia_id)
);

-- Tabela de notificações
CREATE TABLE notificacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('viagem', 'post', 'curtida', 'comentario', 'recompensa', 'nivel')),
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT false,
    data TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    relacionamento_id UUID -- ID do recurso relacionado
);
```

## Principais características do modelo:

1. **Estrutura modular**:
   - Tabelas agrupadas por funcionalidade (usuários, viagens, social, gamificação)
   - Relacionamentos coerentes com DER proposto
   - Constraints para manter integridade dos dados

2. **Gerenciamento de identidade**:
   - Separação entre `usuario` (dados de login) e `perfil` (dados sociais)
   - Suporte a passageiros e motoristas na mesma tabela

3. **Sistema de gamificação completo**:
   - Tabelas `takicoin` e `transacao_takicoin` para pontos
   - `recompensa` com diferentes tipos de prêmios
   - Níveis de usuário no perfil

4. **Viagens e experiências**:
   - `viagem` com tipos temáticos
   - `momento_taki` para vídeos automáticos
   - `evento_especial` para ocasiões importantes

5. **Social e conteúdo**:
   - Sistema de posts com hashtags
   - Comunidades e grupos
   - TAKI TV (`historia`) para conteúdo destacado

6. **Comunicação**:
   - Sistema de chat com suporte a grupos
   - Notificações personalizadas

7. **Otimizações**:
   - UUIDs para identificação universal
   - Timestamps em todas as tabelas
   - Campos para rastreamento de engajamento
