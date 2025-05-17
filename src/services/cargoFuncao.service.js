// src/services/cargoFuncao.service.js
import getDb from '../models/db.js';

async function createCargoFuncao(data) {
  try {
    const db = await getDb();
    const cargoFuncao = await db.CargoFuncao.create(data);
    return cargoFuncao;
  } catch (error) {
    throw new Error(`Erro ao criar CargoFuncao: ${error.message}`);
  }
}

async function getAllCargoFuncoes() {
  try {
    const db = await getDb();
    const cargoFuncoes = await db.CargoFuncao.findAll();
    return cargoFuncoes;
  } catch (error) {
    throw new Error(`Erro ao buscar CargoFuncoes: ${error.message}`);
  }
}

async function getCargoFuncaoById(idCargo, idFuncao) {
  try {
    const db = await getDb();
    const cargoFuncao = await db.CargoFuncao.findOne({
      where: {
        fk_id_cargo: idCargo,
        fk_id_funcao: idFuncao,
      },
    });
    return cargoFuncao;
  } catch (error) {
    throw new Error(`Erro ao buscar CargoFuncao: ${error.message}`);
  }
}

async function deleteCargoFuncao(idCargo, idFuncao) {
  try {
    const db = await getDb();
    const cargoFuncao = await db.CargoFuncao.findOne({
      where: {
        fk_id_cargo: idCargo,
        fk_id_funcao: idFuncao,
      },
    });
    if (!cargoFuncao) {
      return false;
    }
    await cargoFuncao.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar CargoFuncao: ${error.message}`);
  }
}

export default {
  createCargoFuncao,
  getAllCargoFuncoes,
  getCargoFuncaoById,
  deleteCargoFuncao,
};
