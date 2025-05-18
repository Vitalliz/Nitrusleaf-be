// src/controllers/foto.controller.js
import fotoService from '../services/foto.service.js';

// Criar uma nova Foto
async function createFoto(req, res) {
  try {
    const foto = await fotoService.createFoto(req.body);
    res.status(201).json(foto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todas as Fotos
async function getAllFotos(req, res) {
  try {
    const fotos = await fotoService.getAllFotos();
    res.json(fotos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar Foto por ID
async function getFotoById(req, res) {
  try {
    const foto = await fotoService.getFotoById(req.params.id);
    if (!foto) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }
    res.json(foto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar Foto por ID
async function updateFoto(req, res) {
  try {
    const foto = await fotoService.updateFoto(req.params.id, req.body);
    if (!foto) {
      return res.status(404).json({ error: 'Foto não encontrada para atualização' });
    }
    res.json(foto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar Foto por ID
async function deleteFoto(req, res) {
  try {
    const deleted = await fotoService.deleteFoto(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Foto não encontrada para exclusão' });
    }
    res.json({ message: 'Foto deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createFoto,
  getAllFotos,
  getFotoById,
  updateFoto,
  deleteFoto,
};