// src/routes/pessoa.route.js
import express from 'express';
import pessoaController from '../controllers/pessoa.controller.js';
import authenticateToken from '../middleware/auth.middleware.js';

const router = express.Router();

// Cadastro de Pessoa - Aberto (sem autenticação JWT)
router.post('/', pessoaController.createPessoa);

// Rotas protegidas com JWT
router.get('/', authenticateToken, pessoaController.getAllPessoas);
router.get('/:id', authenticateToken, pessoaController.getPessoaById);
router.put('/:id', authenticateToken, pessoaController.updatePessoa);
router.delete('/:id', authenticateToken, pessoaController.deletePessoa);

export default router;