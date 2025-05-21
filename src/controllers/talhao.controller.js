// src/controllers/talhao.controller.js
import talhaoService from '../services/talhao.service.js';

// Criar um novo Talhão
async function createTalhao(req, res) {
  try {
    const talhao = await talhaoService.createTalhao(req.body);
    res.status(201).json(talhao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar os pés de um talhão específico
async function getPesByTalhaoId(req, res) {
  try {
    const pes = await talhaoService.getPesByTalhaoId(req.params.id);
    res.json(pes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Controlador para criação em massa de talhões
async function createTalhoesBulk(req, res) {
  try {
    const talhoes = await talhaoService.createTalhoesBulk(req.body);
    res.status(201).json(talhoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTalhoesByPropriedade(req, res) {
  try {
    const propriedadeId = req.params.id;
    const talhoes = await talhaoService.getTalhoesByPropriedadeId(propriedadeId);
    res.json(talhoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Buscar todos os Talhões
async function getAllTalhoes(req, res) {
  try {
    const talhoes = await talhaoService.getAllTalhoes();
    res.json(talhoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar Talhão por ID
async function getTalhaoById(req, res) {
  try {
    const talhao = await talhaoService.getTalhaoById(req.params.id);
    if (!talhao) {
      return res.status(404).json({ error: 'Talhão não encontrado' });
    }
    res.json(talhao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar Talhão por ID
async function updateTalhao(req, res) {
  try {
    const talhao = await talhaoService.updateTalhao(req.params.id, req.body);
    if (!talhao) {
      return res.status(404).json({ error: 'Talhão não encontrado para atualização' });
    }
    res.json(talhao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar Talhão por ID
async function deleteTalhao(req, res) {
  try {
    const deleted = await talhaoService.deleteTalhao(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Talhão não encontrado para exclusão' });
    }
    res.json({ message: 'Talhão deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createTalhao,
  getAllTalhoes,
  getPesByTalhaoId,
  getTalhoesByPropriedade,
  createTalhoesBulk,
  getTalhaoById,
  updateTalhao,
  deleteTalhao
};