// src/routes/propriedade.route.js
import express from 'express';
import propriedadeController from '../controllers/propriedade.controller.js';

const router = express.Router();

router.post('/', propriedadeController.createPropriedade);
router.post('/bulk', propriedadeController.createPropriedadesBulk);
router.get('/', propriedadeController.getAllPropriedades);
router.get('/:id', propriedadeController.getPropriedadeById);
router.put('/:id', propriedadeController.updatePropriedade);
router.delete('/:id', propriedadeController.deletePropriedade);

export default router;