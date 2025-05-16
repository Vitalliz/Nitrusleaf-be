// src/index.js
import express from 'express';
import cors from 'cors';
import db from './models/index.model.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🚀 API NitrusLeaf online!');
});

// Exemplo de rota de pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await db.Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Função para iniciar o servidor
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados com sucesso.');

    await db.sequelize.sync({ alter: true }); // Atualiza o banco sem perder dados
    console.log('✅ Tabelas sincronizadas.');

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
  }
};

// Iniciar servidor
startServer();