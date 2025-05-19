// src/services/auth.service.js
import getDb from '../models/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';
const REFRESH_TOKEN_EXPIRATION = '7d';
const ACCESS_TOKEN_EXPIRATION = '2h';

// Função para gerar Access Token
async function generateAccessToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id_pessoa,
      nome: usuario.nome,
      email: usuario.email,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
}

// Função para gerar Refresh Token e armazenar no banco
async function generateRefreshToken(usuario) {
  const db = await getDb();
  const refreshToken = jwt.sign({ id: usuario.id_pessoa }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

  await db.RefreshToken.upsert({
    userId: usuario.id_pessoa,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
  });

  return refreshToken;
}

// Função de Login
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

  const accessToken = await generateAccessToken(usuario);
  const refreshToken = await generateRefreshToken(usuario);

  return { accessToken, refreshToken, usuario: { id: usuario.id_pessoa, nome: usuario.nome, email: usuario.email } };
}

// Função para Refresh Token
async function refreshAccessToken(refreshToken) {
  const db = await getDb();
  const tokenRecord = await db.RefreshToken.findOne({ where: { token: refreshToken } });

  if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
    throw new Error('Refresh token inválido ou expirado.');
  }

  const usuario = await db.Pessoa.findByPk(tokenRecord.userId);
  if (!usuario) throw new Error('Usuário não encontrado.');

  const newAccessToken = await generateAccessToken(usuario);
  return newAccessToken;
}

// Função de Logout
async function logout(refreshToken) {
  const db = await getDb();
  await db.RefreshToken.destroy({ where: { token: refreshToken } });
}

export default {
  login,
  refreshAccessToken,
  logout
};