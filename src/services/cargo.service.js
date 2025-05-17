// src/services/cargo.service.js
import getDb from '../models/db.js';

async function createCargo(data) {
  try {
    const db = await getDb();
    const cargo = await db.Cargo.create(data);
    return cargo;
  } catch (error) {
    throw new Error(`Erro ao criar Cargo: ${error.message}`);
  }
}

async function getAllCargos() {
  try {
    const db = await getDb();
    const cargos = await db.Cargo.findAll();
    return cargos;
  } catch (error) {
    throw new Error(`Erro ao buscar Cargos: ${error.message}`);
  }
}

async function getCargoById(id) {
  try {
    const db = await getDb();
    const cargo = await db.Cargo.findByPk(id);
    return cargo;
  } catch (error) {
    throw new Error(`Erro ao buscar Cargo: ${error.message}`);
  }
}

async function updateCargo(id, data) {
  try {
    const db = await getDb();
    const cargo = await db.Cargo.findByPk(id);
    if (!cargo) {
      return null;
    }
    await cargo.update(data);
    return cargo;
  } catch (error) {
    throw new Error(`Erro ao atualizar Cargo: ${error.message}`);
  }
}

async function deleteCargo(id) {
  try {
    const db = await getDb();
    const cargo = await db.Cargo.findByPk(id);
    if (!cargo) {
      return false;
    }
    await cargo.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Cargo: ${error.message}`);
  }
}

export default {
  createCargo,
  getAllCargos,
  getCargoById,
  updateCargo,
  deleteCargo,
};