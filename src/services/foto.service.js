// src/services/foto.service.js
import getDb from '../models/db.js';

// Criar uma nova Foto
async function createFoto(data) {
  try {
    const db = await getDb();
    const foto = await db.Foto.create(data);
    return foto;
  } catch (error) {
    throw new Error(`Erro ao criar Foto: ${error.message}`);
  }
}

// Buscar todas as Fotos
async function getAllFotos() {
  try {
    const db = await getDb();
    const fotos = await db.Foto.findAll();
    return fotos;
  } catch (error) {
    throw new Error(`Erro ao buscar Fotos: ${error.message}`);
  }
}

// Buscar uma Foto por ID
async function getFotoById(id) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    return foto;
  } catch (error) {
    throw new Error(`Erro ao buscar Foto: ${error.message}`);
  }
}

// Atualizar uma Foto por ID
async function updateFoto(id, data) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    if (!foto) {
      return null;
    }
    await foto.update(data);
    return foto;
  } catch (error) {
    throw new Error(`Erro ao atualizar Foto: ${error.message}`);
  }
}

// Deletar uma Foto por ID
async function deleteFoto(id) {
  try {
    const db = await getDb();
    const foto = await db.Foto.findByPk(id);
    if (!foto) {
      return false;
    }
    await foto.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Foto: ${error.message}`);
  }
}

export default {
  createFoto,
  getAllFotos,
  getFotoById,
  updateFoto,
  deleteFoto,
};