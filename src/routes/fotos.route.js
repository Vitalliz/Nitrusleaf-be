// src/routes/foto.route.js
import { Router } from 'express';
import fotoController from '../controllers/foto.controller.js';

const router = Router();

// Rota para criar uma nova Foto
router.post('/', fotoController.createFoto);

router.post('/', fotoController.createFotosBulk);

// Rota para buscar todas as Fotos
router.get('/', fotoController.getAllFotos);

// Rota para buscar uma Foto por ID
router.get('/:id', fotoController.getFotoById);

// Rota para atualizar uma Foto por ID
router.put('/:id', fotoController.updateFoto);

// Rota para deletar uma Foto por ID
router.delete('/:id', fotoController.deleteFoto);

export default router;