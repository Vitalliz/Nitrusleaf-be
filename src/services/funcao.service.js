// src/services/funcao.service.js
import getDb from '../models/db.js';

async function createFuncao(data) {
  try {
    const db = await getDb();
    const funcao = await db.Funcao.create(data);
    return funcao;
  } catch (error) {
    throw new Error(`Erro ao criar Função: ${error.message}`);
  }
}

async function getAllFuncoes() {
  try {
    const db = await getDb();
    const funcoes = await db.Funcao.findAll();
    return funcoes;
  } catch (error) {
    throw new Error(`Erro ao buscar Funções: ${error.message}`);
  }
}

async function getFuncaoById(id) {
  try {
    const db = await getDb();
    const funcao = await db.Funcao.findByPk(id);
    return funcao;
  } catch (error) {
    throw new Error(`Erro ao buscar Função: ${error.message}`);
  }
}

async function updateFuncao(id, data) {
  try {
    const db = await getDb();
    const funcao = await db.Funcao.findByPk(id);
    if (!funcao) {
      return null;
    }
    await funcao.update(data);
    return funcao;
  } catch (error) {
    throw new Error(`Erro ao atualizar Função: ${error.message}`);
  }
}

async function deleteFuncao(id) {
  try {
    const db = await getDb();
    const funcao = await db.Funcao.findByPk(id);
    if (!funcao) {
      return false;
    }
    await funcao.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Função: ${error.message}`);
  }
}

export default {
  createFuncao,
  getAllFuncoes,
  getFuncaoById,
  updateFuncao,
  deleteFuncao,
};