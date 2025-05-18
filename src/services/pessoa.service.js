// src/services/pessoa.service.js
import getDb from '../models/db.js';

async function createPessoa(data) {
  try {
    const db = await getDb();
    
    // Cria a pessoa na tabela principal
    const pessoa = await db.Pessoa.create({
      nome: data.nome,
      sobrenome: data.sobrenome,
      email: data.email,
      telefone: data.telefone,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.cidade,
      numero: data.numero,
      senha_hash: data.senha_hash,
      status: data.status || 'ativo',
      fk_id_cargo: data.fk_id_cargo,
    });

    // Verifica se é Pessoa Física ou Jurídica
    if (data.tipo === 'fisica') {
      await db.PessoaFisica.create({
        id_pessoa: pessoa.id_pessoa,
        cpf: data.cpf,
        data_nasc: data.data_nasc,
      });
    } else if (data.tipo === 'juridica') {
      await db.PessoaJuridica.create({
        id_pessoa: pessoa.id_pessoa,
        cnpj: data.cnpj,
        nome_fantasia: data.nome_fantasia,
      });
    }

    return pessoa;
  } catch (error) {
    throw new Error(`Erro ao criar pessoa: ${error.message}`);
  }
}

async function getAllPessoas() {
  try {
    const db = await getDb();
    const pessoas = await db.Pessoa.findAll({
      include: [
        { model: db.PessoaFisica, as: 'pessoaFisica' },
        { model: db.PessoaJuridica, as: 'pessoaJuridica' },
      ],
    });
    return pessoas;
  } catch (error) {
    throw new Error(`Erro ao buscar pessoas: ${error.message}`);
  }
}

async function getPessoaById(id) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(id, {
      include: [
        { model: db.PessoaFisica, as: 'pessoaFisica' },
        { model: db.PessoaJuridica, as: 'pessoaJuridica' },
      ],
    });
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

    // Atualiza os dados principais
    await pessoa.update(data);

    // Atualiza Pessoa Física ou Jurídica se for o caso
    if (data.tipo === 'fisica') {
      const pessoaFisica = await db.PessoaFisica.findOne({ where: { id_pessoa: id } });
      if (pessoaFisica) {
        await pessoaFisica.update({
          cpf: data.cpf,
          data_nasc: data.data_nasc,
        });
      }
    } else if (data.tipo === 'juridica') {
      const pessoaJuridica = await db.PessoaJuridica.findOne({ where: { id_pessoa: id } });
      if (pessoaJuridica) {
        await pessoaJuridica.update({
          cnpj: data.cnpj,
          nome_fantasia: data.nome_fantasia,
        });
      }
    }

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

    // Deleta também PessoaFisica ou PessoaJuridica se existir
    await db.PessoaFisica.destroy({ where: { id_pessoa: id } });
    await db.PessoaJuridica.destroy({ where: { id_pessoa: id } });
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