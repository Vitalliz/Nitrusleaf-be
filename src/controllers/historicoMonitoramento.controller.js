// src/controllers/historicoMonitoramento.controller.js
import historicoMonitoramentoService from '../services/historicoMonitoramento.service.js';

// Criar um novo Histórico de Monitoramento
async function createHistoricoMonitoramento(req, res) {
  try {
    const historico = await historicoMonitoramentoService.createHistoricoMonitoramento(req.body);
    res.status(201).json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todos os Históricos de Monitoramento
async function getAllHistoricoMonitoramentos(req, res) {
  try {
    const historicos = await historicoMonitoramentoService.getAllHistoricoMonitoramentos();
    res.json(historicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar Histórico de Monitoramento por ID
async function getHistoricoMonitoramentoById(req, res) {
  try {
    const historico = await historicoMonitoramentoService.getHistoricoMonitoramentoById(req.params.id);
    if (!historico) {
      return res.status(404).json({ error: 'Histórico de Monitoramento não encontrado' });
    }
    res.json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar Histórico de Monitoramento por ID
async function updateHistoricoMonitoramento(req, res) {
  try {
    const historico = await historicoMonitoramentoService.updateHistoricoMonitoramento(req.params.id, req.body);
    if (!historico) {
      return res.status(404).json({ error: 'Histórico de Monitoramento não encontrado para atualização' });
    }
    res.json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar Histórico de Monitoramento por ID
async function deleteHistoricoMonitoramento(req, res) {
  try {
    const deleted = await historicoMonitoramentoService.deleteHistoricoMonitoramento(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Histórico de Monitoramento não encontrado para exclusão' });
    }
    res.json({ message: 'Histórico de Monitoramento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createHistoricoMonitoramento,
  getAllHistoricoMonitoramentos,
  getHistoricoMonitoramentoById,
  updateHistoricoMonitoramento,
  deleteHistoricoMonitoramento,
};