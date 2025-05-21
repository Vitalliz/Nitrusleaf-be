// src/routes/talhao.route.js
import { Router } from 'express';
import talhaoController from '../controllers/talhao.controller.js';

const router = Router();

// Rota para criar um novo Talhão
router.post('/', talhaoController.createTalhao);


router.post('/bulk', talhaoController.createTalhoesBulk);

// Rota para buscar todos os Talhões
router.get('/', talhaoController.getAllTalhoes);

router.get('/:id/pes', talhaoController.getPesByTalhaoId);

router.get('/propriedade/:id', talhaoController.getTalhoesByPropriedade);

// Rota para buscar um Talhão por ID
router.get('/:id', talhaoController.getTalhaoById);

// Rota para atualizar um Talhão por ID
router.put('/:id', talhaoController.updateTalhao);

export default router;