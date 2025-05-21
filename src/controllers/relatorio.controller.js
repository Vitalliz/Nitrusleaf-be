// src/controllers/relatorio.controller.js
import relatorioService from '../services/relatorio.service.js';

// Criar um novo Relatório
async function createRelatorio(req, res) {
  try {
    const relatorio = await relatorioService.createRelatorio(req.body);
    res.status(201).json(relatorio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todos os Relatórios
async function getAllRelatoriosByProperty(req, res) {
  try {
    const relatorios = await relatorioService.getAllRelatoriosByProperty();
    res.json(relatorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllRelatorios(req, res) {
  try {
    const relatorios = await relatorioService.getAllRelatorios();
    res.json(relatorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar Relatório por ID
async function getRelatorioById(req, res) {
  try {
    const relatorio = await relatorioService.getRelatorioById(req.params.id);
    if (!relatorio) {
      return res.status(404).json({ error: 'Relatório não encontrado' });
    }
    res.json(relatorio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar Relatório por ID
async function updateRelatorio(req, res) {
  try {
    const relatorio = await relatorioService.updateRelatorio(req.params.id, req.body);
    if (!relatorio) {
      return res.status(404).json({ error: 'Relatório não encontrado para atualização' });
    }
    res.json(relatorio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar Relatório por ID
async function deleteRelatorio(req, res) {
  try {
    const deleted = await relatorioService.deleteRelatorio(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Relatório não encontrado para exclusão' });
    }
    res.json({ message: 'Relatório deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createRelatorio,
  getAllRelatoriosByProperty,
  getAllRelatorios,
  getRelatorioById,
  updateRelatorio,
  deleteRelatorio,
};