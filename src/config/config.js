// src/config/database.js
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

export default {
  [env]: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Garante que a porta está configurada
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false, // Permite SSL sem verificação de certificado
      } : false,
    },
  },
};