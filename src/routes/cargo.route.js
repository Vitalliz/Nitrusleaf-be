// src/routes/cargo.route.js
import express from 'express';
import cargoController from '../controllers/cargo.controller.js';

const router = express.Router();

router.post('/', cargoController.createCargo);
router.get('/', cargoController.getAllCargos);
router.get('/:id', cargoController.getCargoById);
router.put('/:id', cargoController.updateCargo);
router.delete('/:id', cargoController.deleteCargo);

export default router;