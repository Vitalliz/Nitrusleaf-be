// src/controllers/cargoFuncao.controller.js
import cargoFuncaoService from '../services/cargoFuncao.service.js';

async function createCargoFuncao(req, res) {
  try {
    const cargoFuncao = await cargoFuncaoService.createCargoFuncao(req.body);
    res.status(201).json(cargoFuncao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCargoFuncoes(req, res) {
  try {
    const cargoFuncoes = await cargoFuncaoService.getAllCargoFuncoes();
    res.json(cargoFuncoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCargoFuncaoById(req, res) {
  try {
    const { fk_id_cargo, fk_id_funcao } = req.params;
    const cargoFuncao = await cargoFuncaoService.getCargoFuncaoById(fk_id_cargo, fk_id_funcao);
    if (!cargoFuncao) {
      return res.status(404).json({ error: 'CargoFuncao não encontrada' });
    }
    res.json(cargoFuncao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCargoFuncao(req, res) {
  try {
    const { fk_id_cargo, fk_id_funcao } = req.params;
    const deleted = await cargoFuncaoService.deleteCargoFuncao(fk_id_cargo, fk_id_funcao);
    if (!deleted) {
      return res.status(404).json({ error: 'CargoFuncao não encontrada para exclusão' });
    }
    res.json({ message: 'CargoFuncao deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createCargoFuncao,
  getAllCargoFuncoes,
  getCargoFuncaoById,
  deleteCargoFuncao,
};