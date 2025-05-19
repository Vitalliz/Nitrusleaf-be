import { Sequelize } from 'sequelize';
import loadModels from '../models/index.model.js';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function autoMigrate() {
  try {
    console.log('> Início da migração automática');
    const db = await loadModels();
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    console.log('✅ Migração automática concluída.');
  } catch (error) {
    console.error('❌ Erro na migração automática:', error);
  }
}

autoMigrate();