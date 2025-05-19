// src/services/pessoa.service.js
import getDb from '../models/db.js';
import bcrypt from 'bcryptjs';

// Função para criar uma nova pessoa com senha hasheada
async function createPessoa(data) {
  try {
    const db = await getDb();
    
    // Verificação de CPF ou CNPJ duplicado
    if (data.tipo === 'fisica') {
      const existingPessoaFisica = await db.PessoaFisica.findOne({
        where: { cpf: data.cpf }
      });
      if (existingPessoaFisica) {
        throw new Error('CPF já cadastrado.');
      }
    } else if (data.tipo === 'juridica') {
      const existingPessoaJuridica = await db.PessoaJuridica.findOne({
        where: { cnpj: data.cnpj }
      });
      if (existingPessoaJuridica) {
        throw new Error('CNPJ já cadastrado.');
      }
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    
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
      senha_hash: hashedPassword, // Senha já hasheada
      status: data.status || 'ativo',
      fk_id_cargo: data.fk_id_cargo,
    });

    // Verifica se é Pessoa Física ou Jurídica e cria o registro correspondente
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

// Buscar todas as pessoas (com dados completos)
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

// Buscar uma pessoa por ID
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

// Atualizar pessoa (com hash de senha se for atualizado)
async function updatePessoa(id, data) {
  try {
    const db = await getDb();
    const pessoa = await db.Pessoa.findByPk(id);
    if (!pessoa) {
      return null;
    }

    // Hash da senha apenas se for atualizada
    if (data.senha) {
      data.senha_hash = await bcrypt.hash(data.senha, 10);
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

// Deletar pessoa
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