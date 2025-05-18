// src/services/historicoMonitoramento.service.js
import getDb from '../models/db.js';

// Criar um novo Histórico de Monitoramento
async function createHistoricoMonitoramento(data) {
  try {
    const db = await getDb();
    const historico = await db.HistoricoMonitoramento.create(data);
    return historico;
  } catch (error) {
    throw new Error(`Erro ao criar Histórico de Monitoramento: ${error.message}`);
  }
}

// Buscar todos os Históricos de Monitoramento
async function getAllHistoricoMonitoramentos() {
  try {
    const db = await getDb();
    const historicos = await db.HistoricoMonitoramento.findAll();
    return historicos;
  } catch (error) {
    throw new Error(`Erro ao buscar Históricos de Monitoramento: ${error.message}`);
  }
}

// Buscar um Histórico de Monitoramento por ID
async function getHistoricoMonitoramentoById(id) {
  try {
    const db = await getDb();
    const historico = await db.HistoricoMonitoramento.findByPk(id);
    return historico;
  } catch (error) {
    throw new Error(`Erro ao buscar Histórico de Monitoramento: ${error.message}`);
  }
}

// Atualizar um Histórico de Monitoramento por ID
async function updateHistoricoMonitoramento(id, data) {
  try {
    const db = await getDb();
    const historico = await db.HistoricoMonitoramento.findByPk(id);
    if (!historico) {
      return null;
    }
    await historico.update(data);
    return historico;
  } catch (error) {
    throw new Error(`Erro ao atualizar Histórico de Monitoramento: ${error.message}`);
  }
}

// Deletar um Histórico de Monitoramento por ID
async function deleteHistoricoMonitoramento(id) {
  try {
    const db = await getDb();
    const historico = await db.HistoricoMonitoramento.findByPk(id);
    if (!historico) {
      return false;
    }
    await historico.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Histórico de Monitoramento: ${error.message}`);
  }
}

export default {
  createHistoricoMonitoramento,
  getAllHistoricoMonitoramentos,
  getHistoricoMonitoramentoById,
  updateHistoricoMonitoramento,
  deleteHistoricoMonitoramento,
};