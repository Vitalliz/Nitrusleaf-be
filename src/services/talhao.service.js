// src/services/talhao.service.js
import getDb from '../models/db.js';

// Serviço para criar um Talhão e atualizar o total de talhões na propriedade
async function createTalhao(data) {
  try {
    const db = await getDb();
    
    // Criar o talhão
    const talhao = await db.Talhao.create(data);

    // Atualizar o total de talhões da propriedade
    await updatePropertyTalhoesCount(talhao.fk_id_propriedade);
    
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao criar Talhão: ${error.message}`);
  }
}

// Serviço para criar talhões em massa e atualizar a propriedade
async function createTalhoesBulk(data) {
  const db = await getDb();
  const talhoes = await db.Talhao.bulkCreate(data);

  // Atualizar o total de talhões em cada propriedade afetada
  const propriedadeIds = [...new Set(data.map(t => t.fk_id_propriedade))];
  for (const id of propriedadeIds) {
    await updatePropertyTalhoesCount(id);
  }

  return talhoes;
}

async function getPesByTalhaoId(talhaoId) {
  try {
    const db = await getDb();
    const pes = await db.Pe.findAll({
      where: { fk_id_talhao: talhaoId },
      attributes: [
        'id_pe',
        'nome',
        'situacao',
      ],
    });

    // Mapeia para formato amigável ao frontend
    return pes.map(pe => ({
      id: pe.id_pe,
      nome: pe.nome,
      status: capitalizeSituacao(pe.situacao),
      corStatus: mapStatusColor(pe.situacao),
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar pés do talhão ${talhaoId}: ${error.message}`);
  }
}

async function getAllTalhoes() {
  try {
    const db = await getDb();
    const talhoes = await db.Talhao.findAll();
    return talhoes;
  } catch (error) {
    throw new Error(`Erro ao buscar Talhões: ${error.message}`);
  }
}

async function getTalhaoById(id) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao buscar Talhão: ${error.message}`);
  }
}

async function updateTalhao(id, data) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    if (!talhao) return null;
    await talhao.update(data);
    return talhao;
  } catch (error) {
    throw new Error(`Erro ao atualizar Talhão: ${error.message}`);
  }
}

// Serviço para deletar talhão e atualizar a contagem
async function deleteTalhao(id) {
  try {
    const db = await getDb();
    const talhao = await db.Talhao.findByPk(id);
    if (!talhao) return false;

    const propriedadeId = talhao.fk_id_propriedade;
    await talhao.destroy();

    // Atualizar o total de talhões da propriedade
    await updatePropertyTalhoesCount(propriedadeId);
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Talhão: ${error.message}`);
  }
}

// Função para atualizar o total de talhões na propriedade
async function updatePropertyTalhoesCount(propriedadeId) {
  const db = await getDb();
  const totalTalhoes = await db.Talhao.count({ where: { fk_id_propriedade: propriedadeId } });
  await db.Propriedade.update({ talhoes_registrados: totalTalhoes }, { where: { id_propriedade: propriedadeId } });
}

async function getTalhoesByPropriedadeId(propriedadeId) {
  try {
    const db = await getDb();
    const talhoes = await db.Talhao.findAll({
      where: { fk_id_propriedade: propriedadeId },
      order: [['nome', 'ASC']], // opcional
    });
    return talhoes;
  } catch (error) {
    throw new Error(`Erro ao buscar talhões da propriedade ${propriedadeId}: ${error.message}`);
  }
}

function capitalizeSituacao(status) {
  switch (status) {
    case 'tratado': return 'Tratado';
    case 'nao tratado': return 'Não Tratado';
    default: return 'Sem informações';
  }
}

function mapStatusColor(status) {
  switch (status) {
    case 'tratado': return 'roxo';
    case 'nao tratado': return 'amarelo';
    default: return 'cinza';
  }
}

export default {
  createTalhao,
  createTalhoesBulk,
  getAllTalhoes,
  getTalhoesByPropriedadeId,
  getPesByTalhaoId,
  getTalhaoById,
  updateTalhao,
  deleteTalhao,
};