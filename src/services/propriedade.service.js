// src/services/propriedade.service.js
import getDb from '../models/db.js';

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

async function getAllPropriedades() {
  try {
    const db = await getDb();
    const propriedades = await db.Propriedade.findAll({
      include: {
        model: db.Pessoa,
        as: 'proprietario',
        attributes: ['id_pessoa', 'nome', 'email'],
      },
    });
    return propriedades;
  } catch (error) {
    throw new Error(`Erro ao buscar Propriedades: ${error.message}`);
  }
}

async function getPropriedadeById(id) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id, {
      include: {
        model: db.Pessoa,
        as: 'proprietario',
        attributes: ['id_pessoa', 'nome', 'email'],
      },
    });
    return propriedade;
  } catch (error) {
    throw new Error(`Erro ao buscar Propriedade: ${error.message}`);
  }
}

async function updatePropriedade(id, data) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id);
    if (!propriedade) {
      return null;
    }
    await propriedade.update(data);
    return propriedade;
  } catch (error) {
    throw new Error(`Erro ao atualizar Propriedade: ${error.message}`);
  }
}

async function deletePropriedade(id) {
  try {
    const db = await getDb();
    const propriedade = await db.Propriedade.findByPk(id);
    if (!propriedade) {
      return false;
    }
    await propriedade.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar Propriedade: ${error.message}`);
  }
}

export default {
  createPropriedade,
  getAllPropriedades,
  getPropriedadeById,
  updatePropriedade,
  deletePropriedade,
};