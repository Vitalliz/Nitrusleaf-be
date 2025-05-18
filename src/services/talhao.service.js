// src/services/talhao.service.js
import getDb from '../models/db.js';

async function createTalhao(data) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.create(data);
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao criar Talhão: ${error.message}`);
  }
}

async function getAllTalhoes() {
  try {
    const db = await getDb();
    const talhoes = await db.Talhao.findAll();
    return talhoes;
  } catch (error) {
    throw new Error(`Erro ao buscar Talhões: ${error.message}`);
  }
}

async function getTalhaoById(id) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao buscar Talhão: ${error.message}`);
  }
}

async function updateTalhao(id, data) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    if (!talhao) return null;
    await talhao.update(data);
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao atualizar Talhão: ${error.message}`);
  }
}

async function deleteTalhao(id) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    if (!talhao) return false;
    await talhao.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Talhão: ${error.message}`);
  }
}

export default {
  createTalhao,
  getAllTalhoes,
  getTalhaoById,
  updateTalhao,
  deleteTalhao,
};