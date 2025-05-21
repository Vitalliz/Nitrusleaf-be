// src/services/metricaIA.service.js
import getDb from '../models/db.js';

// Criar uma nova Métrica IA
async function createMetricaIA(data) {
  try {
    const db = await getDb();
    const metrica = await db.MetricaIA.create(data);
    return metrica;
  } catch (error) {
    throw new Error(`Erro ao criar Métrica IA: ${error.message}`);
  }
}

// Buscar todas as Métricas IA
async function getAllMetricasIA() {
  try {
    const db = await getDb();
    const metricas = await db.MetricaIA.findAll();
    return metricas;
  } catch (error) {
    throw new Error(`Erro ao buscar Métricas IA: ${error.message}`);
  }
}

// Buscar uma Métrica IA por ID
async function getMetricaIAById(id) {
  try {
    const db = await getDb();
    const metrica = await db.MetricaIA.findByPk(id);
    return metrica;
  } catch (error) {
    throw new Error(`Erro ao buscar Métrica IA: ${error.message}`);
  }
}

// Atualizar uma Métrica IA por ID
async function updateMetricaIA(id, data) {
  try {
    const db = await getDb();
    const metrica = await db.MetricaIA.findByPk(id);
    if (!metrica) {
      return null;
    }
    await metrica.update(data);
    return metrica;
  } catch (error) {
    throw new Error(`Erro ao atualizar Métrica IA: ${error.message}`);
  }
}

async function getMetricasByRelatorioId(relatorioId) {
  try {
    const db = await getDb();
    const metricas = await db.MetricaIA.findAll({
      where: { fk_id_relatorio: relatorioId },
    });
    return metricas;
  } catch (error) {
    throw new Error(`Erro ao buscar Métricas IA por relatório: ${error.message}`);
  }
}

// Deletar uma Métrica IA por ID
async function deleteMetricaIA(id) {
  try {
    const db = await getDb();
    const metrica = await db.MetricaIA.findByPk(id);
    if (!metrica) {
      return false;
    }
    await metrica.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Métrica IA: ${error.message}`);
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