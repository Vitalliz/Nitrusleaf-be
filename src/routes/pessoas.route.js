import express from 'express';
import pessoaController from '../controllers/pessoa.controller.js';

const router = express.Router();

router.post('/', pessoaController.createPessoa);
router.get('/', pessoaController.getAllPessoas);
router.get('/:id', pessoaController.getPessoaById);
router.put('/:id', pessoaController.updatePessoa);
router.delete('/:id', pessoaController.deletePessoa);

export default router;