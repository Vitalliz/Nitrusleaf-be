import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

export default {
  [env]: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
};