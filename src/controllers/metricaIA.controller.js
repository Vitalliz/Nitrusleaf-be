// src/controllers/metricaIA.controller.js
import metricaIAService from '../services/metricaIA.service.js';

// Criar uma nova Métrica IA
async function createMetricaIA(req, res) {
  try {
    const metrica = await metricaIAService.createMetricaIA(req.body);
    res.status(201).json(metrica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todas as Métricas IA
async function getAllMetricasIA(req, res) {
  try {
    const metricas = await metricaIAService.getAllMetricasIA();
    res.json(metricas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar Métrica IA por ID
async function getMetricaIAById(req, res) {
  try {
    const metrica = await metricaIAService.getMetricaIAById(req.params.id);
    if (!metrica) {
      return res.status(404).json({ error: 'Métrica IA não encontrada' });
    }
    res.json(metrica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar Métrica IA por ID
async function updateMetricaIA(req, res) {
  try {
    const metrica = await metricaIAService.updateMetricaIA(req.params.id, req.body);
    if (!metrica) {
      return res.status(404).json({ error: 'Métrica IA não encontrada para atualização' });
    }
    res.json(metrica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar Métrica IA por ID
async function deleteMetricaIA(req, res) {
  try {
    const deleted = await metricaIAService.deleteMetricaIA(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Métrica IA não encontrada para exclusão' });
    }
    res.json({ message: 'Métrica IA deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getMetricasByRelatorioId(req, res) {
  try {
    const { relatorioId } = req.query;
    if (!relatorioId) {
      return res.status(400).json({ error: "relatorioId é obrigatório" });
    }

    const metricas = await metricaIAService.getMetricasByRelatorioId(relatorioId);
    res.json(metricas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export default {
  createMetricaIA,
  getAllMetricasIA,
  getMetricasByRelatorioId,
  getMetricaIAById,
  updateMetricaIA,
  deleteMetricaIA,
};