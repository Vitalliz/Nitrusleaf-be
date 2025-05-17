// src/services/pessoa.service.js
import getDb from '../models/db.js';

async function createPessoa(data) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.create(data);
    return pessoa;
  } catch (error) {
    throw new Error(`Erro ao criar pessoa: ${error.message}`);
  }
}

async function getAllPessoas() {
  try {
    const db = await getDb();
    const pessoas = await db.Pessoa.findAll();
    return pessoas;
  } catch (error) {
    throw new Error(`Erro ao buscar pessoas: ${error.message}`);
  }
}

async function getPessoaById(id) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(id);
    return pessoa;
  } catch (error) {
    throw new Error(`Erro ao buscar pessoa: ${error.message}`);
  }
}

async function updatePessoa(id, data) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(id);
    if (!pessoa) {
      return null;
    }
    await pessoa.update(data);
    return pessoa;
  } catch (error) {
    throw new Error(`Erro ao atualizar pessoa: ${error.message}`);
  }
}

async function deletePessoa(id) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(id);
    if (!pessoa) {
      return false;
    }
    await pessoa.destroy();
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar pessoa: ${error.message}`);
  }
}

export default {
  createPessoa,
  getAllPessoas,
  getPessoaById,
  updatePessoa,
  deletePessoa,
};