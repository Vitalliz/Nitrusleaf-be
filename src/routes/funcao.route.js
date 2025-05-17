// src/routes/funcao.route.js
import express from 'express';
import funcaoController from '../controllers/funcao.controller.js';

const router = express.Router();

router.post('/', funcaoController.createFuncao);
router.get('/', funcaoController.getAllFuncoes);
router.get('/:id', funcaoController.getFuncaoById);
router.put('/:id', funcaoController.updateFuncao);
router.delete('/:id', funcaoController.deleteFuncao);

export default router;