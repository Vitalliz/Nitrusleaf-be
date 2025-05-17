import express from 'express';
import cors from 'cors';
import getDb from './models/db.js'; // singleton que importa e carrega db
import pessoaRoutes from './routes/pessoa.route.js';
import tipoFuncaoRoutes from './routes/tipoFuncao.route.js';
import funcaoRoutes from './routes/funcao.route.js';
import cargoRoutes from './routes/cargo.route.js';
import cargoFuncaoRoutes from './routes/cargoFuncao.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// usar rotas diretamente, sem precisar passar db aqui se singleton estiver ok
app.use('/pessoas', pessoaRoutes);
app.use('/tipoFuncoes', tipoFuncaoRoutes);
app.use('/funcao', funcaoRoutes);
app.use('/cargo', cargoRoutes);
app.use('cargoFuncao', cargoFuncaoRoutes);

async function startServer() {
  try {
    const db = await getDb();
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados com sucesso.');

    await db.sequelize.sync({ force: false, alter: false });
    console.log('✅ Tabelas sincronizadas.');

    app.get('/', (req, res) => {
      res.send('🚀 API NitrusLeaf online!');
    });

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
  }
}

startServer();