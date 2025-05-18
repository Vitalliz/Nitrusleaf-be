// src/routes/tipoFuncao.route.js
import express from 'express';
import tipoFuncaoController from '../controllers/tipoFuncao.controller.js';

const router = express.Router();

router.post('/', tipoFuncaoController.createTipoFuncao);
router.get('/', tipoFuncaoController.getAllTipoFuncoes);
router.get('/:id', tipoFuncaoController.getTipoFuncaoById);
router.put('/:id', tipoFuncaoController.updateTipoFuncao);
router.delete('/:id', tipoFuncaoController.deleteTipoFuncao);

export default router;