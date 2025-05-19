// src/services/propriedade.service.js
import getDb from '../models/db.js';

// ✅ Criar uma nova propriedade
async function createPropriedade(data) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(data.fk_id_proprietario);

    if (!pessoa) {
      throw new Error('Proprietário não encontrado');
    }

    const propriedade = await db.Propriedade.create(data);
    return propriedade;
  } catch (error) {
    throw new Error(`Erro ao criar Propriedade: ${error.message}`);
  }
}

// ✅ Buscar propriedades de um usuário por ID do proprietário
async function getUserProperties(userId) {
  try {
    const db = await getDb();
    const propriedades = await db.Propriedade.findAll({
      where: { fk_id_proprietario: userId },
      include: {
        model: db.Pessoa,
        as: 'proprietario', // ✅ Alias corrigido para 'proprietario'
        attributes: ['id_pessoa', 'nome', 'email'],
      },
    });

    if (propriedades.length === 0) {
      return [];
    }

    return propriedades;
  } catch (error) {
    throw new Error(`Erro ao buscar propriedades do usuário: ${error.message}`);
  }
}

// ✅ Buscar todas as propriedades (admin)
async function getAllPropriedades() {
  try {
    const db = await getDb();
    const propriedades = await db.Propriedade.findAll({
      include: {
        model: db.Pessoa,
        as: 'proprietario', // ✅ Alias corrigido para 'proprietario'
        attributes: ['id_pessoa', 'nome', 'email'],
      },
    });
    return propriedades;
  } catch (error) {
    throw new Error(`Erro ao buscar Propriedades: ${error.message}`);
  }
}

// ✅ Buscar uma propriedade por ID
async function getPropriedadeById(id) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id, {
      include: {
        model: db.Pessoa,
        as: 'proprietario', // ✅ Alias corrigido para 'proprietario'
        attributes: ['id_pessoa', 'nome', 'email'],
      },
    });

    if (!propriedade) {
      throw new Error('Propriedade não encontrada');
    }

    return propriedade;
  } catch (error) {
    throw new Error(`Erro ao buscar Propriedade: ${error.message}`);
  }
}

// ✅ Atualizar uma propriedade
async function updatePropriedade(id, data) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id);
    if (!propriedade) {
      throw new Error('Propriedade não encontrada para atualização');
    }

    await propriedade.update(data);
    return propriedade;
  } catch (error) {
    throw new Error(`Erro ao atualizar Propriedade: ${error.message}`);
  }
}

// ✅ Excluir uma propriedade
async function deletePropriedade(id) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id);
    if (!propriedade) {
      throw new Error('Propriedade não encontrada para exclusão');
    }

    await propriedade.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Propriedade: ${error.message}`);
  }
}

// ✅ Criar propriedades em massa
async function createPropriedadesBulk(data) {
  try {
    const db = await getDb();
    const propriedades = await db.Propriedade.bulkCreate(data);
    return propriedades;
  } catch (error) {
    throw new Error(`Erro ao criar Propriedades em massa: ${error.message}`);
  }
}

export default {
  createPropriedade,
  getUserProperties,
  getAllPropriedades,
  getPropriedadeById,
  updatePropriedade,
  deletePropriedade,
  createPropriedadesBulk,
};