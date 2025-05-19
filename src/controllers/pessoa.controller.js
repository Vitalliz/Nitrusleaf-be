// src/controllers/pessoa.controller.js
import pessoaService from '../services/pessoa.service.js';

// Criar uma nova pessoa
async function createPessoa(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;
    
    // Validação básica dos campos obrigatórios
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ error: 'Nome, email, senha e tipo são obrigatórios.' });
    }

    if (tipo === 'fisica' && (!req.body.cpf || !req.body.data_nasc)) {
      return res.status(400).json({ error: 'CPF e data de nascimento são obrigatórios para pessoa física.' });
    }

    if (tipo === 'juridica' && (!req.body.cnpj || !req.body.nome_fantasia)) {
      return res.status(400).json({ error: 'CNPJ e nome fantasia são obrigatórios para pessoa jurídica.' });
    }

    // Chamar o service para criar a pessoa
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
    const { tipo } = req.body;

    // Validação básica para atualização
    if (tipo === 'fisica' && (!req.body.cpf || !req.body.data_nasc)) {
      return res.status(400).json({ error: 'CPF e data de nascimento são obrigatórios para pessoa física.' });
    }

    if (tipo === 'juridica' && (!req.body.cnpj || !req.body.nome_fantasia)) {
      return res.status(400).json({ error: 'CNPJ e nome fantasia são obrigatórios para pessoa jurídica.' });
    }

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
  deletePessoa,
};