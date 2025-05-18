// src/services/pe.service.js
import getDb from '../models/db.js';

// Criar um novo Pé
async function createPe(data) {
  try {
    const db = await getDb();
    const pe = await db.Pe.create(data);
    return pe;
  } catch (error) {
    throw new Error(`Erro ao criar Pé: ${error.message}`);
  }
}

// Buscar todos os Pés
async function getAllPes() {
  try {
    const db = await getDb();
    const pes = await db.Pe.findAll();
    return pes;
  } catch (error) {
    throw new Error(`Erro ao buscar Pés: ${error.message}`);
  }
}

// Buscar um Pé por ID
async function getPeById(id) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    return pe;
  } catch (error) {
    throw new Error(`Erro ao buscar Pé: ${error.message}`);
  }
}

// Atualizar um Pé por ID
async function updatePe(id, data) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    if (!pe) {
      return null;
    }
    await pe.update(data);
    return pe;
  } catch (error) {
    throw new Error(`Erro ao atualizar Pé: ${error.message}`);
  }
}

// Deletar um Pé por ID
async function deletePe(id) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    if (!pe) {
      return false;
    }
    await pe.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Pé: ${error.message}`);
  }
}

export default {
  createPe,
  getAllPes,
  getPeById,
  updatePe,
  deletePe,
};