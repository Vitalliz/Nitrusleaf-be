import pessoaService from '../services/pessoa.service.js';

/**
 * Controller para gerenciar requisições da entidade Pessoa
 */

// Criar uma nova pessoa
async function createPessoa(req, res) {
  try {
    const pessoa = await pessoaService.createPessoa(req.body);
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar todas as pessoas
async function getAllPessoas(req, res) {
  try {
    const pessoas = await pessoaService.getAllPessoas();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Buscar pessoa por ID
async function getPessoaById(req, res) {
  try {
    const pessoa = await pessoaService.getPessoaById(req.params.id);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Atualizar pessoa por ID
async function updatePessoa(req, res) {
  try {
    const pessoa = await pessoaService.updatePessoa(req.params.id, req.body);
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada para atualização' });
    }
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar pessoa por ID
async function deletePessoa(req, res) {
  try {
    const deleted = await pessoaService.deletePessoa(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pessoa não encontrada para exclusão' });
    }
    res.json({ message: 'Pessoa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  createPessoa,
  getAllPessoas,
  getPessoaById,
  updatePessoa,
  deletePessoa
};
