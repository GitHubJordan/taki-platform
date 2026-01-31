
require('dotenv').config(); // carrega .env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const authRoutes = require('./routes/auth');

// lê ALLOWED_ORIGINS do .env e monta uma whitelist
const rawOrigins = process.env.ALLOWED_ORIGINS || '';
const whitelist = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);

// opcional: log das origins lidas
console.log('CORS whitelist:', whitelist);

// CORS options: permite requests sem origin (nativo/Expo Go) e origens na whitelist
const corsOptions = {
  origin: function (origin, callback) {
    // origin === undefined -> pedido vindo de app nativa (React Native / Expo Go) ou curl sem header
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  // credentials: true // ativa se precisares de cookies/session (não usado com JWT normalmente)
};

// aplica CORS
app.use(cors(corsOptions));

// Config JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// rotas
app.use('/auth', authRoutes);

// exemplo de rota root (útil para test)
app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

// erro específico de CORS pode ser tratado (opcional)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith('CORS policy')) {
    return res.status(403).json({ error: 'CORS error', message: err.message });
  }
  next(err);
});

// iniciar servidor
const PORT = process.env.PORT || 1603;
app.listen(PORT, () => {
  console.log(`servidor ligado na porta ${PORT} 🚀`);
});
