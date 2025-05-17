// src/controllers/cargo.controller.js
import cargoService from '../services/cargo.service.js';

async function createCargo(req, res) {
  try {
    const cargo = await cargoService.createCargo(req.body);
    res.status(201).json(cargo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCargos(req, res) {
  try {
    const cargos = await cargoService.getAllCargos();
    res.json(cargos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCargoById(req, res) {
  try {
    const cargo = await cargoService.getCargoById(req.params.id);
    if (!cargo) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCargo(req, res) {
  try {
    const cargo = await cargoService.updateCargo(req.params.id, req.body);
    if (!cargo) {
      return res.status(404).json({ error: 'Cargo não encontrado para atualização' });
    }
    res.json(cargo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCargo(req, res) {
  try {
    const deleted = await cargoService.deleteCargo(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Cargo não encontrado para exclusão' });
    }
    res.json({ message: 'Cargo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createCargo,
  getAllCargos,
  getCargoById,
  updateCargo,
  deleteCargo,
};
