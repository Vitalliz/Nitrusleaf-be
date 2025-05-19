// src/routes/pe.route.js
import { Router } from 'express';
import peController from '../controllers/pe.controller.js';

const router = Router();

// Rota para criar um novo Pé
router.post('/', peController.createPe);

router.post('/bulk', peController.createPesBulk);

// Rota para buscar todos os Pés
router.get('/', peController.getAllPes);

// Rota para buscar um Pé por ID
router.get('/:id', peController.getPeById);

// Rota para atualizar um Pé por ID
router.put('/:id', peController.updatePe);

// Rota para deletar um Pé por ID
router.delete('/:id', peController.deletePe);

export default router;