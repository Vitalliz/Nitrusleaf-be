// src/services/auth.service.js
import getDb from '../models/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

async function login(email, senha) {
  const db = await getDb();
  const usuario = await db.Pessoa.findOne({ where: { email } });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
  if (!senhaValida) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    {
      id: usuario.id_pessoa,
      nome: usuario.nome,
      email: usuario.email,
    },
    JWT_SECRET,
    { expiresIn: '1h' } // Expira em 1 hora
  );

  return { token, usuario: { id: usuario.id_pessoa, nome: usuario.nome, email: usuario.email } };
}

export default {
  login
};
