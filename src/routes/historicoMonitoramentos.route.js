// src/routes/historicoMonitoramento.route.js
import { Router } from 'express';
import historicoMonitoramentoController from '../controllers/historicoMonitoramento.controller.js';

const router = Router();

// Rota para criar um novo Histórico de Monitoramento
router.post('/', historicoMonitoramentoController.createHistoricoMonitoramento);

// Rota para buscar todos os Históricos de Monitoramento
router.get('/', historicoMonitoramentoController.getAllHistoricoMonitoramentos);

// Rota para buscar um Histórico de Monitoramento por ID
router.get('/:id', historicoMonitoramentoController.getHistoricoMonitoramentoById);

// Rota para atualizar um Histórico de Monitoramento por ID
router.put('/:id', historicoMonitoramentoController.updateHistoricoMonitoramento);

// Rota para deletar um Histórico de Monitoramento por ID
router.delete('/:id', historicoMonitoramentoController.deleteHistoricoMonitoramento);

export default router;