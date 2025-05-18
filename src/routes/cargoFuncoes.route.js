// src/routes/cargoFuncao.route.js
import express from 'express';
import cargoFuncaoController from '../controllers/cargoFuncao.controller.js';

const router = express.Router();

// Cria associação CargoFuncao
router.post('/', cargoFuncaoController.createCargoFuncao);

// Lista todas associações
router.get('/', cargoFuncaoController.getAllCargoFuncoes);

// Busca uma associação pelo par (fk_id_cargo, fk_id_funcao)
router.get('/:fk_id_cargo/:fk_id_funcao', cargoFuncaoController.getCargoFuncaoById);

// Deleta uma associação pelo par (fk_id_cargo, fk_id_funcao)
router.delete('/:fk_id_cargo/:fk_id_funcao', cargoFuncaoController.deleteCargoFuncao);

export default router;