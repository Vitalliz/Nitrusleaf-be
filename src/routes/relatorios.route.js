// src/routes/relatorio.route.js
import { Router } from 'express';
import relatorioController from '../controllers/relatorio.controller.js';

const router = Router();

// Rota para criar um novo Relatório
router.post('/', relatorioController.createRelatorio);

// Rota para buscar todos os Relatórios
router.get('/', relatorioController.getAllRelatoriosByProperty);

router.get('/all', relatorioController.getAllRelatorios);


// Rota para buscar um Relatório por ID
router.get('/:id', relatorioController.getRelatorioById);

// Rota para atualizar um Relatório por ID
router.put('/:id', relatorioController.updateRelatorio);

// Rota para deletar um Relatório por ID
router.delete('/:id', relatorioController.deleteRelatorio);

export default router;