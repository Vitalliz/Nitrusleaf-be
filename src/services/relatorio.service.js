// src/services/relatorio.service.js
import getDb from '../models/db.js';

// Criar um novo Relatório
async function createRelatorio(data) {
  try {
    const db = await getDb();
    const relatorio = await db.Relatorio.create(data);
    return relatorio;
  } catch (error) {
    throw new Error(`Erro ao criar Relatório: ${error.message}`);
  }
}

// Buscar todos os Relatórios
async function getAllRelatorios() {
  try {
    const db = await getDb();
    const relatorios = await db.Relatorio.findAll();
    return relatorios;
  } catch (error) {
    throw new Error(`Erro ao buscar Relatórios: ${error.message}`);
  }
}

// Buscar um Relatório por ID
async function getRelatorioById(id) {
  try {
    const db = await getDb();
    const relatorio = await db.Relatorio.findByPk(id);
    return relatorio;
  } catch (error) {
    throw new Error(`Erro ao buscar Relatório: ${error.message}`);
  }
}

// Atualizar um Relatório por ID
async function updateRelatorio(id, data) {
  try {
    const db = await getDb();
    const relatorio = await db.Relatorio.findByPk(id);
    if (!relatorio) {
      return null;
    }
    await relatorio.update(data);
    return relatorio;
  } catch (error) {
    throw new Error(`Erro ao atualizar Relatório: ${error.message}`);
  }
}

// Deletar um Relatório por ID
async function deleteRelatorio(id) {
  try {
    const db = await getDb();
    const relatorio = await db.Relatorio.findByPk(id);
    if (!relatorio) {
      return false;
    }
    await relatorio.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Relatório: ${error.message}`);
  }
}

export default {
  createRelatorio,
  getAllRelatorios,
  getRelatorioById,
  updateRelatorio,
  deleteRelatorio,
};