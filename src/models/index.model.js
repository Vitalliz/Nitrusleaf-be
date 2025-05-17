import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import applyAssociations from './associations.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};

async function loadModels() {
  console.log('> Início loadModels');
  try {
    const modelFiles = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith('.js') && file !== 'index.model.js' && file !== 'associations.js' && file !== 'db.js');

    console.log(`> Arquivos de modelo encontrados: ${modelFiles}`);
    for (const file of modelFiles) {
      console.log(`> Importando modelo ${file}`);
      const { default: defineModel } = await import(`./${file}`);
      const model = defineModel(sequelize, DataTypes);
      db[model.name] = model;
      console.log(`> Modelo ${model.name} importado`);
    }
    console.log('Modelos carregados no db:', Object.keys(db));

    applyAssociations(db);
    console.log('> Associações aplicadas com sucesso');

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    console.log('> loadModels finalizado');
    return db;
  } catch (error) {
    console.error('Erro em loadModels:', error);
    throw error;
  }
}

export default loadModels;