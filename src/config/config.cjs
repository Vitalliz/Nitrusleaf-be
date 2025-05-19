require('dotenv').config();

const useSSL = process.env.DB_SSL === 'true';

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      ssl: useSSL ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: useSSL ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: useSSL ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
};