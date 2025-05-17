// src/controllers/tipoFuncao.controller.js
import tipoFuncaoService from '../services/tipoFuncao.service.js';

async function createTipoFuncao(req, res) {
  try {
    const tipoFuncao = await tipoFuncaoService.createTipoFuncao(req.body);
    res.status(201).json(tipoFuncao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTipoFuncoes(req, res) {
  try {
    const tipos = await tipoFuncaoService.getAllTipoFuncoes();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTipoFuncaoById(req, res) {
  try {
    const tipo = await tipoFuncaoService.getTipoFuncaoById(req.params.id);
    if (!tipo) {
      return res.status(404).json({ error: 'TipoFuncao não encontrada' });
    }
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTipoFuncao(req, res) {
  try {
    const tipo = await tipoFuncaoService.updateTipoFuncao(req.params.id, req.body);
    if (!tipo) {
      return res.status(404).json({ error: 'TipoFuncao não encontrada para atualização' });
    }
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTipoFuncao(req, res) {
  try {
    const deleted = await tipoFuncaoService.deleteTipoFuncao(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'TipoFuncao não encontrada para exclusão' });
    }
    res.json({ message: 'TipoFuncao deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createTipoFuncao,
  getAllTipoFuncoes,
  getTipoFuncaoById,
  updateTipoFuncao,
  deleteTipoFuncao,
};
