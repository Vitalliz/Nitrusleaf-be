// src/controllers/propriedade.controller.js
import propriedadeService from '../services/propriedade.service.js';
import getDb from '../models/db.js'; // ✅ Importa o banco diretamente

// ✅ Controlador para criar uma nova propriedade
async function createPropriedade(req, res) {
  try {
    const propriedade = await propriedadeService.createPropriedade(req.body);
    res.status(201).json(propriedade);
  } catch (error) {
    console.error("❌ Erro ao criar propriedade:", error);
    res.status(500).json({ error: "Erro ao criar propriedade" });
  }
}

// ✅ Controlador para criação em massa de propriedades
async function createPropriedadesBulk(req, res) {
  try {
    const propriedades = await propriedadeService.createPropriedadesBulk(req.body);
    res.status(201).json(propriedades);
  } catch (error) {
    console.error("❌ Erro ao criar propriedades em massa:", error);
    res.status(500).json({ error: "Erro ao criar propriedades em massa" });
  }
}

// ✅ Controlador para buscar todas as propriedades (admin)
async function getAllPropriedades(req, res) {
  try {
    const propriedades = await propriedadeService.getAllPropriedades();
    res.status(200).json(propriedades);
  } catch (error) {
    console.error("❌ Erro ao buscar todas as propriedades:", error);
    res.status(500).json({ error: "Erro ao buscar todas as propriedades" });
  }
}

// ✅ Controlador para obter propriedades de um usuário autenticado
async function getPropriedadesByUser(req, res) {
  try {
    const userId = req.params.userId; // ✅ Corrigido para usar req.params
    const propriedades = await propriedadeService.getUserProperties(userId);
    res.status(200).json(propriedades);
  } catch (error) {
    console.error("❌ Erro ao buscar propriedades:", error);
    res.status(500).json({ message: "Erro ao buscar propriedades" });
  }
}

// ✅ Controlador para buscar uma propriedade por ID
async function getPropriedadeById(req, res) {
  try {
    const propriedade = await propriedadeService.getPropriedadeById(req.params.id);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }
    res.status(200).json(propriedade);
  } catch (error) {
    console.error("❌ Erro ao buscar propriedade por ID:", error);
    res.status(500).json({ error: "Erro ao buscar propriedade por ID" });
  }
}

// ✅ Controlador para atualizar uma propriedade
async function updatePropriedade(req, res) {
  try {
    const propriedade = await propriedadeService.updatePropriedade(req.params.id, req.body);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada para atualização' });
    }
    res.status(200).json(propriedade);
  } catch (error) {
    console.error("❌ Erro ao atualizar propriedade:", error);
    res.status(500).json({ error: "Erro ao atualizar propriedade" });
  }
}

// ✅ Controlador para excluir uma propriedade
async function deletePropriedade(req, res) {
  try {
    const deleted = await propriedadeService.deletePropriedade(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Propriedade não encontrada para exclusão' });
    }
    res.status(200).json({ message: 'Propriedade deletada com sucesso' });
  } catch (error) {
    console.error("❌ Erro ao deletar propriedade:", error);
    res.status(500).json({ error: "Erro ao deletar propriedade" });
  }
}

// ✅ Exportando o controlador atualizado
export default {
  createPropriedade,
  getAllPropriedades,
  getPropriedadesByUser,
  getPropriedadeById,
  createPropriedadesBulk,
  updatePropriedade,
  deletePropriedade,
};