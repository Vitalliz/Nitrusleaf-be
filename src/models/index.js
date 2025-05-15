import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';
import PessoaModel from './pessoa.js';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Pessoa = PessoaModel(sequelize, DataTypes);

export default db;
