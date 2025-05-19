'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    // Adicione comandos de migração aqui
    // Exemplo: await queryInterface.createTable('users', { id: DataTypes.INTEGER });
  },

  async down(queryInterface) {
    // Adicione comandos para reverter as mudanças
    // Exemplo: await queryInterface.dropTable('users');
  }
};