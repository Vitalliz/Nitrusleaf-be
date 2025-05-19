// src/index.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import getDb from './models/db.js';
import authenticateToken from './middleware/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Resolver __dirname para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Função para carregar automaticamente todas as rotas da pasta "routes"
async function loadRoutes(app) {
  const routesDir = path.resolve(__dirname, './routes');
  const routeFiles = fs.readdirSync(routesDir).filter(file => file.endsWith('.route.js'));

  for (const routeFile of routeFiles) {
    const routePath = pathToFileURL(path.join(routesDir, routeFile)).href;
    try {
      const routeModule = await import(routePath);
      const routeName = routeFile.replace('.route.js', '');

      // Rotas que NÃO precisam de autenticação
      if (routeName === 'auth' || (routeName === 'pessoas' && routeModule.default.stack.some(r => r.route.methods.post))) {
        app.use(`/${routeName}`, routeModule.default);
      } else {
        // Rotas protegidas com JWT
        app.use(`/${routeName}`, authenticateToken, routeModule.default);
      }

      console.log(`✅ Rota /${routeName} carregada.`);
    } catch (error) {
      console.error(`❌ Erro ao carregar rota ${routeFile}:`, error);
    }
  }
}

async function startServer() {
  try {
    const db = await getDb();
    await db.sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados com sucesso.');

    await db.sequelize.sync({ force: false, alter: false });
    console.log('✅ Tabelas sincronizadas.');

    // Carregar rotas automaticamente
    await loadRoutes(app);

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