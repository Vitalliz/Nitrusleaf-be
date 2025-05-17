// src/services/tipoFuncao.service.js
import getDb from '../models/db.js';

async function createTipoFuncao(data) {
  try {
    const db = await getDb();
    const tipoFuncao = await db.TipoFuncao.create(data);
    return tipoFuncao;
  } catch (error) {
    throw new Error(`Erro ao criar TipoFuncao: ${error.message}`);
  }
}

async function getAllTipoFuncoes() {
  try {
    const db = await getDb();
    const tipos = await db.TipoFuncao.findAll();
    return tipos;
  } catch (error) {
    throw new Error(`Erro ao buscar TipoFuncoes: ${error.message}`);
  }
}

async function getTipoFuncaoById(id) {
  try {
    const db = await getDb();
    const tipo = await db.TipoFuncao.findByPk(id);
    return tipo;
  } catch (error) {
    throw new Error(`Erro ao buscar TipoFuncao: ${error.message}`);
  }
}

async function updateTipoFuncao(id, data) {
  try {
    const db = await getDb();
    const tipo = await db.TipoFuncao.findByPk(id);
    if (!tipo) {
      return null;
    }
    await tipo.update(data);
    return tipo;
  } catch (error) {
    throw new Error(`Erro ao atualizar TipoFuncao: ${error.message}`);
  }
}

async function deleteTipoFuncao(id) {
  try {
    const db = await getDb();
    const tipo = await db.TipoFuncao.findByPk(id);
    if (!tipo) {
      return false;
    }
    await tipo.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar TipoFuncao: ${error.message}`);
  }
}

export default {
  createTipoFuncao,
  getAllTipoFuncoes,
  getTipoFuncaoById,
  updateTipoFuncao,
  deleteTipoFuncao,
};