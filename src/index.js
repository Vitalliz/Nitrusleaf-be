// src/index.js
import express from 'express';
import cors from 'cors';
import db from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔁 Test route
app.get('/', (req, res) => {
  res.send('🚀 API NitrusLeaf online!');
});

// 👇 Exemplo de rota de pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await db.Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔌 Conectar ao banco e iniciar servidor
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
});
