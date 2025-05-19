// src/routes/propriedade.route.js
import express from 'express';
import propriedadeController from '../controllers/propriedade.controller.js';

const router = express.Router();

// ✅ Rota para criar uma propriedade
router.post('/', propriedadeController.createPropriedade);

// ✅ Rota para criar propriedades em massa
router.post('/bulk', propriedadeController.createPropriedadesBulk);

// ✅ Rota para buscar propriedades de um usuário autenticado
router.get('/user/:userId', propriedadeController.getPropriedadesByUser);

// ✅ Rota para buscar todas as propriedades (admin)
router.get('/', propriedadeController.getAllPropriedades);

// ✅ Rota para buscar uma propriedade por ID
router.get('/:id', propriedadeController.getPropriedadeById);

// ✅ Rota para atualizar uma propriedade
router.put('/:id', propriedadeController.updatePropriedade);

// ✅ Rota para excluir uma propriedade
router.delete('/:id', propriedadeController.deletePropriedade);

export default router;