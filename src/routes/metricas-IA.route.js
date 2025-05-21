// src/routes/metricaIA.route.js
import { Router } from 'express';
import metricaIAController from '../controllers/metricaIA.controller.js';

const router = Router();

// Rota para criar uma nova Métrica IA
router.post('/', metricaIAController.createMetricaIA);

// Rota para buscar Métricas IA por relatório (query param)
router.get('/search', metricaIAController.getMetricasByRelatorioId);

// Rota para buscar todas as Métricas IA
router.get('/', metricaIAController.getAllMetricasIA);

// Rota para buscar uma Métrica IA por ID
router.get('/:id', metricaIAController.getMetricaIAById);

// Rota para atualizar uma Métrica IA por ID
router.put('/:id', metricaIAController.updateMetricaIA);

// Rota para deletar uma Métrica IA por ID
router.delete('/:id', metricaIAController.deleteMetricaIA);

export default router;