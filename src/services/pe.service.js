// src/services/pe.service.js
import getDb from '../models/db.js';

// Função para criar um novo Pé
async function createPe(data) {
  try {
    const db = await getDb();
    const pe = await db.Pe.create(data);
    
    // Atualiza o total de pés do talhão e da propriedade
    await updateTalhaoAndPropriedadePesCount(data.fk_id_talhao);
    
    return pe;
  } catch (error) {
    throw new Error(`Erro ao criar Pé: ${error.message}`);
  }
}

// Função para criar vários Pés em massa
async function createPesBulk(data) {
  try {
    const db = await getDb();
    const pes = await db.Pe.bulkCreate(data);

    // Atualiza o total de pés dos talhões afetados
    const talhaoIds = [...new Set(data.map(pe => pe.fk_id_talhao))];
    for (const talhaoId of talhaoIds) {
      await updateTalhaoAndPropriedadePesCount(talhaoId);
    }

    return pes;
  } catch (error) {
    throw new Error(`Erro ao criar Pés em massa: ${error.message}`);
  }
}

// Função para deletar um Pé
async function deletePe(id) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    if (!pe) return false;

    const talhaoId = pe.fk_id_talhao;
    await pe.destroy();

    // Atualiza o total de pés do talhão e da propriedade
    await updateTalhaoAndPropriedadePesCount(talhaoId);

    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Pé: ${error.message}`);
  }
}

// Função para atualizar o total de pés do talhão e da propriedade
async function updateTalhaoAndPropriedadePesCount(talhaoId) {
  const db = await getDb();
  const talhao = await db.Talhao.findByPk(talhaoId);
  if (!talhao) return;

  // Conta o total de pés no talhão
  const totalPesNoTalhao = await db.Pe.count({ where: { fk_id_talhao: talhaoId } });

  // Atualiza o total de pés no talhão
  await talhao.update({ total_pes: totalPesNoTalhao });

  // Atualiza o total de pés na propriedade associada ao talhão
  const propriedade = await db.Propriedade.findByPk(talhao.fk_id_propriedade);
  if (propriedade) {
    const totalPesNaPropriedade = await db.Talhao.sum('total_pes', {
      where: { fk_id_propriedade: propriedade.id_propriedade }
    });

    await propriedade.update({ total_pes: totalPesNaPropriedade });
  }
}

// Outras funções do serviço
async function getAllPes() {
  try {
    const db = await getDb();
    const pes = await db.Pe.findAll();
    return pes;
  } catch (error) {
    throw new Error(`Erro ao buscar Pés: ${error.message}`);
  }
}

async function getPeById(id) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    return pe;
  } catch (error) {
    throw new Error(`Erro ao buscar Pé: ${error.message}`);
  }
}

async function updatePe(id, data) {
  try {
    const db = await getDb();
    const pe = await db.Pe.findByPk(id);
    if (!pe) return null;
    
    await pe.update(data);
    
    // Atualiza o total de pés do talhão e da propriedade se o talhão foi alterado
    if (data.fk_id_talhao) {
      await updateTalhaoAndPropriedadePesCount(data.fk_id_talhao);
    }

    return pe;
  } catch (error) {
    throw new Error(`Erro ao atualizar Pé: ${error.message}`);
  }
}

export default {
  createPe,
  createPesBulk,
  getAllPes,
  getPeById,
  updatePe,
  deletePe,
  updateTalhaoAndPropriedadePesCount
};