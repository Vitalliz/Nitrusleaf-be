// src/controllers/pe.controller.js
import peService from '../services/pe.service.js';

// Criar um novo Pé
async function createPe(req, res) {
  try {
    const pe = await peService.createPe(req.body);
    res.status(201).json(pe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todos os Pés
async function getAllPes(req, res) {
  try {
    const pes = await peService.getAllPes();
    res.json(pes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar um Pé por ID
async function getPeById(req, res) {
  try {
    const pe = await peService.getPeById(req.params.id);
    if (!pe) {
      return res.status(404).json({ error: 'Pé não encontrado' });
    }
    res.json(pe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar um Pé por ID
async function updatePe(req, res) {
  try {
    const pe = await peService.updatePe(req.params.id, req.body);
    if (!pe) {
      return res.status(404).json({ error: 'Pé não encontrado para atualização' });
    }
    res.json(pe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar um Pé por ID
async function deletePe(req, res) {
  try {
    const deleted = await peService.deletePe(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pé não encontrado para exclusão' });
    }
    res.json({ message: 'Pé deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createPe,
  getAllPes,
  getPeById,
  updatePe,
  deletePe,
};