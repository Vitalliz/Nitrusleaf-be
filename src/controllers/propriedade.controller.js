// src/controllers/propriedade.controller.js
import propriedadeService from '../services/propriedade.service.js';

async function createPropriedade(req, res) {
  try {
    const propriedade = await propriedadeService.createPropriedade(req.body);
    res.status(201).json(propriedade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para criação em massa de propriedades
async function createPropriedadesBulk(req, res) {
  try {
    const propriedades = await propriedadeService.createPropriedadesBulk(req.body);
    res.status(201).json(propriedades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getAllPropriedades(req, res) {
  try {
    const propriedades = await propriedadeService.getAllPropriedades();
    res.json(propriedades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPropriedadeById(req, res) {
  try {
    const propriedade = await propriedadeService.getPropriedadeById(req.params.id);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }
    res.json(propriedade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePropriedade(req, res) {
  try {
    const propriedade = await propriedadeService.updatePropriedade(req.params.id, req.body);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada para atualização' });
    }
    res.json(propriedade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deletePropriedade(req, res) {
  try {
    const deleted = await propriedadeService.deletePropriedade(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Propriedade não encontrada para exclusão' });
    }
    res.json({ message: 'Propriedade deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createPropriedade,
  getAllPropriedades,
  getPropriedadeById,
  createPropriedadesBulk,
  updatePropriedade,
  deletePropriedade,
};