// src/controllers/funcao.controller.js
import funcaoService from '../services/funcao.service.js';

async function createFuncao(req, res) {
  try {
    const funcao = await funcaoService.createFuncao(req.body);
    res.status(201).json(funcao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllFuncoes(req, res) {
  try {
    const funcoes = await funcaoService.getAllFuncoes();
    res.json(funcoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFuncaoById(req, res) {
  try {
    const funcao = await funcaoService.getFuncaoById(req.params.id);
    if (!funcao) {
      return res.status(404).json({ error: 'Função não encontrada' });
    }
    res.json(funcao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFuncao(req, res) {
  try {
    const funcao = await funcaoService.updateFuncao(req.params.id, req.body);
    if (!funcao) {
      return res.status(404).json({ error: 'Função não encontrada para atualização' });
    }
    res.json(funcao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteFuncao(req, res) {
  try {
    const deleted = await funcaoService.deleteFuncao(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Função não encontrada para exclusão' });
    }
    res.json({ message: 'Função deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createFuncao,
  getAllFuncoes,
  getFuncaoById,
  updateFuncao,
  deleteFuncao,
};